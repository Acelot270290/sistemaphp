import { useEffect } from "react";
import Pusher from "pusher-js";

const PusherListener = ({ channelName, eventName, onEvent }) => {
  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      encrypted: true,
    });

    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, (data) => {
      onEvent(data);
    });

    return () => {
      channel.unbind(eventName);
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [channelName, eventName, onEvent]);

  return null;
};

export default PusherListener;
