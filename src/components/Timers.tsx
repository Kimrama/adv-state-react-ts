import { useTimersContext } from "../store/timer-context";
import Timer from "./Timer";

export default function Timers() {
    const { timers } = useTimersContext();

    return (
        <ul>
            {timers.map((timer) => (
                <li key={timer.name}>
                    <Timer {...timer} />
                </li>
            ))}
        </ul>
    );
}
