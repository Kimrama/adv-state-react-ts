import { useState, useEffect, useRef } from "react";
import Container from "./UI/Container.tsx";
import {
    Timer as TimerProps,
    useTimersContext,
} from "../store/timer-context.tsx";

export default function Timer({ name, duration }: TimerProps) {
    const [remainingTime, setRemainingTime] = useState(duration * 1000);
    const interval = useRef<number | null>(null);
    const { isRunning } = useTimersContext();

    if (remainingTime <= 0 && interval.current) {
        clearInterval(interval.current);
    }
    useEffect(() => {
        let time: number;
        if (isRunning) {
            time = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev > 0) {
                        return prev - 50;
                    } else {
                        return prev;
                    }
                });
            }, 50);
            interval.current = time;
        } else if (interval.current) {
            clearInterval(interval.current);
        }

        return () => clearInterval(time);
    }, [isRunning]);

    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

    return (
        <Container as="article">
            <h2>{name}</h2>
            <progress max={duration * 1000} value={remainingTime} />
            <p>{formattedRemainingTime}</p>
        </Container>
    );
}
