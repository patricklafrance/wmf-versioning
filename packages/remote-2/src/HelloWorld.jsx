import { useSharedContext } from "shared";
import uselessLib from "useless-lib";
import { version } from "react";

export default function HelloWorld() {
    const sharedValue = useSharedContext();

    return (
        <div>Hello from remote-2 <strong>(react v{version} - useless-lib v{uselessLib.version})</strong> - <strong>{sharedValue}</strong></div>
    )
}