"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { playListStore, useAudioStore } from "../store/store";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  CloseCircle,
  Next,
  PauseCircle,
  Play,
  Previous,
  Repeat,
  RepeateOne,
  Shuffle,
  VolumeCross,
  VolumeHigh,
  VolumeLow1,
} from "iconsax-react";
import { TracksState } from "../types/interfaces";

export default function PlayBar() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const [duration, setDuration] = useState<number>(0);
  const [mediaQuery, setMediaQuery] = useState("sm");
  const [currentTime, setCurrentTime] = useState(0);
  const [state, setState] = useState(0);
  const [volume, setVolume] = useState(100);
  const [shuffleState, setShuffleState] = useState<boolean>(false);
  const [repeatState, setRepeatState] = useState<string>("");
  const {  setPlayList, playList } = playListStore();
  const { audio, setAudio ,playState, setPlayState} = useAudioStore();

  useEffect(() => {
    const w = window.innerWidth;
    function update() {
      setMediaQuery(
        w <= 640 ? "sm" : w <= 768 ? "md" : w <= 1024 ? "lg" : "xlg"
      );
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["all"],
    queryFn: async () => {
      const res = (await axios.get(`${url}`)).data;
      return res;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  const artist = useMemo(() => {
    return data
      ? data[0].artists.find(
          (item: { name: string; id: string }) =>
            parseInt(item.id) === audio.artistId
        )
      : [];
  }, [data, audio.artistId]);

  const tracks = useMemo(() => {
    return data ? data[2].tracks : [];
  }, [data]);

  useEffect(() => {
    if (data) {
      setPlayList(data[2].tracks);
    }
  }, [data]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const cleanedValue = Math.floor(value * 100) / 100;
    if (audioRef.current) {
      audioRef.current.currentTime = cleanedValue;
    }
    setCurrentTime(cleanedValue);
  };

  useEffect(() => {
    const element = audioRef.current;
    if (!element) return;

    const onloaded = () => {
      if (!isNaN(element.duration)) setDuration(element.duration);

      if (playState) {
        element.play().catch((err) => console.log(err));
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(element.currentTime);
      const x =
        (audioRef.current!.currentTime / audioRef.current!.duration) * 100;
      setState(x);
    };

    element.addEventListener("loadedmetadata", onloaded);
    element.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      element.removeEventListener("loadedmetadata", onloaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [audio.src]);

  useEffect(() => {
    setPlayState(true);
    if (!audioRef.current) return;
    // audioRef.current.src = audio.src || "";
    console.log(playState, "سلام");
    playState ? audioRef.current.play() : null;
  }, [audio.src]);

  useEffect(() => {
    if (repeatState === "repeatOne") {
      if (state === 100) {
        if (audioRef.current?.paused) {
          audioRef.current.play();
        }
      }
    } else if (repeatState === "repeatList") {
      if (state === 100) {
        if (audioRef.current?.paused) {
          handleNextMusic();
        }
      }
    }

    if (shuffleState) {
      if (state === 100) {
        if (audioRef.current?.paused) {
          handleNextMusic();
        }
      }
    }

    if (state === 100) {
      if (audioRef.current?.paused) {
        setState(0);
        setCurrentTime(0);
        // setIsPlayed(false);
      }
    }
  }, [state]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setVolume(value);
    audioRef.current!.volume = value / 100;
  };

  function handleNextMusic() {
    console.log(playList);

    let nextItem = [];
    if (shuffleState) {
      const shuffledArray = shuffleArray(playList);
      nextItem = shuffledArray.filter((item: TracksState, i: number) => {
        const trackId = audio.id;
        return i + 1 === trackId;
      });
    } else {
      nextItem = playList.filter((item: TracksState) => {
        const trackId = audio.id === tracks.length ? 1 : audio.id + 1;

        return item.id === trackId;
      });
    }
    nextItem.map((item: TracksState) =>
      setAudio(
        item.id,
        item.title,
        item.artistId,
        item.albumId,
        item.src,
        item.cover,
        item.new,
        item.length
      )
    );
    if (audioRef.current?.paused) {
      setPlayState(true);
      // audioRef.current!.play();
    }
  }

  const handlePreviousMusic = () => {
    let previousItem = [];
    if (shuffleState) {
      const shuffledArray = shuffleArray(playList);
      previousItem = shuffledArray.filter((item: TracksState, i: number) => {
        return i + 1 === audio.id;
      });
    } else {
      previousItem = playList.filter((item: TracksState) => {
        const trackId = audio.id === tracks[0].id ? 30 : audio.id - 1;
        console.log(trackId);
        return item.id === trackId;
      });
    }
    previousItem.map((item: TracksState) =>
      setAudio(
        item.id,
        item.title,
        item.artistId,
        item.albumId,
        item.src,
        item.cover,
        item.new,
        item.length
      )
    );
    if (audioRef.current?.paused) {
      setPlayState(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  function shuffleArray(array: TracksState[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  return (
    <section
      className={`${
        audio.id === 0 ? "hidden" : ""
      } text-black flex justify-center items-center w-full lg:w-[78%]    h-[12vh] fixed bottom-1 left-0 z-50`}
    >
      <div className="w-[98%] h-full px-5 flex justify-between rounded-full backdrop-blur-2xl bg-stone-50/5 pb-2">
        <CloseCircle
          size="32"
          color="#d9e3f0"
          className="absolute -top-5 right-5 cursor-pointer"
          onClick={() => setAudio(0, "", 0, 0, "", "", false, 0)}
        />
        {/* photo and title  */}
        <div className="flex items-center justify-start gap-4 h-full w-[15%]">
          <Image
            src={audio.cover !== "" ? audio.cover : "/images/logo2.png"}
            alt={audio.title}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="h-full flex flex-col justify-center gap-2">
            <p className="text-white">{audio.title}</p>
            <p className="text-gray-300 text-sm">{artist?.name}</p>
          </div>
        </div>

        {/* play pause box */}
        <div className="flex w-[68%]  h-full flex-col justify-center items-center gap-2 pt-[1%]">
          <div className="flex justify-around items-center w-1/2 p-5 h-1/2 *:hover:text-[#FF8A65]">
            {repeatState === "repeatList" ? (
              <Repeat
                size={mediaQuery === 'sm' ? '25':mediaQuery === 'md' ? '20':"50"}
                color="#FF8A65"
                className="ml-5 cursor-pointer"
                onClick={(e) => {
                  setRepeatState("repeatOne");
                  setShuffleState(false);
                }}
              />
            ) : repeatState === "repeatOne" ? (
              <RepeateOne
                onClick={() => setRepeatState("")}
                size="32"
                color="#FF8A65"
              />
            ) : (
              <Repeat
                size="32"
                color="#d9e3f0"
                className="ml-5 cursor-pointer"
                onClick={(e) => {
                  setRepeatState("repeatList");
                  setShuffleState(false);
                }}
              />
            )}

            <Next
              size="32"
              color="#d9e3f0"
              className="cursor-pointer"
              onClick={handleNextMusic}
            />
            {playState ? (
              <PauseCircle
                size="32"
                color="#ff8a65"
                onClick={() => {
                  audioRef.current?.pause();
                  setPlayState(false);
                }}
                className="cursor-pointer"
              />
            ) : (
              <Play
                size="32"
                color="#d9e3f0"
                onClick={() => {
                  audioRef.current?.play();
                  setPlayState(true);
                }}
                className="cursor-pointer"
              />
            )}

            <Previous
              size="32"
              color="#d9e3f0"
              className="cursor-pointer"
              onClick={handlePreviousMusic}
            />
            <Shuffle
              size="32"
              color={shuffleState ? "#ff8a65" : "#d9e3f0"}
              className="mr-5 cursor-pointer"
              onClick={() => {
                setShuffleState(!shuffleState);
              }}
            />
            {audio.src ? <audio src={audio.src} ref={audioRef} /> : null}
          </div>
          <div className="w-full h-full relative">
            <span className="absolute top-0 right-0 text-white">
              {formatTime(duration)}
            </span>
            <input
              type="range"
              name=""
              id=""
              value={currentTime}
              onChange={(e) => handleRangeChange(e)}
              step={1}
              min={0}
              max={duration}
              className="w-[80%] opacity-0 range-slider absolute bottom-1 left-[10%] z-50"
            />
            <div
              className={`w-[80%] h-4 bg-gray-500 rounded-full flex absolute bottom-1 left-[10%] z-0 `}
              style={{ direction: "ltr" }}
            >
              <span
                style={{ width: `${state}%` }}
                className=" h-4 rounded-full bg-gray-300"
              ></span>
            </div>
            <span className="absolute top-0 left-0 text-white">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* volume box  */}
        <div className="w-[12%] h-full relative flex justify-center gap-2.5 items-center ">
          <input
            type="range"
            name=""
            value={volume}
            onChange={handleVolumeChange}
            step={1}
            min={0}
            max={100}
            className="w-full range-slider1 "
            style={{ direction: "ltr" }}
          />
          {volume === 0 ? (
            <VolumeCross size="32" color="#d9e3f0" />
          ) : volume <= 50 ? (
            <VolumeLow1 size="32" color="#d9e3f0" />
          ) : (
            <VolumeHigh size="32" color="#d9e3f0" />
          )}
          {/* <div
              className={`w-full h-4 bg-gray-500 rounded-full flex absolute top-0 left-0 z-0 `}
              style={{ direction: "ltr" }}
            >
              <span
                style={{ width: `${state}%` }}
                className=" h-4 rounded-full bg-gray-300"
              ></span>
            </div> */}
        </div>
      </div>
    </section>
  );
}
