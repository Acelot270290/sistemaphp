import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { removeMessage, setMessage } from "../../../../reducers";
import { showResponseError } from "../../../../helpers";
import api from "../../../../services";

export function useAlertWidgetPreview({ widgetId }) {
  const dispatch = useAppDispatch();
  const [widgetData, setWidgetData] = useState(null);
  const messages = useAppSelector((state) => state.messages.messages);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [queue, setQueue] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (widgetId) {
      fetchWidgetById(widgetId);
    }
  }, [widgetId]);

  useEffect(() => {
    if (widgetData) {
      const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        encrypted: true,
      });

      const channel = pusher.subscribe(
        `channel-widget-${widgetData?.user?.slug}-${widgetData?.template}`
      );

      channel.bind(
        `event-widget-${widgetData?.user?.slug}-${widgetData?.template}`,
        (data) => {
          dispatch(setMessage(data));
        }
      );

      return () => {
        channel.unbind(
          `event-widget-${widgetData?.user?.slug}-${widgetData?.template}`
        );
        channel.unsubscribe();
        pusher.disconnect();
      };
    }
  }, [widgetData]);

  useEffect(() => {
    if (messages.length > 0) {
      setQueue((prevQueue) => [...prevQueue, ...messages]);
      messages.forEach((message) => {
        dispatch(removeMessage(message.data.transaction_id));
      });
    }
  }, [messages, dispatch]);

  useEffect(() => {
    if (queue.length > 0 && !currentMessage) {
      showNextMessage();
    }
  }, [queue, currentMessage]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const showNextMessage = () => {
    if (queue.length > 0) {
      const nextMessage = queue[0];
      setCurrentMessage(nextMessage);
      setQueue((prevQueue) =>
        prevQueue.filter(
          (message) =>
            message.data.transaction_id !== nextMessage.data.transaction_id
        )
      );

      timerRef.current = setTimeout(() => {
        setCurrentMessage(null);
      }, widgetData?.variations?.config?.duration * 1000);
    }
  };

  const fetchWidgetById = async (widgetId) => {
    try {
      const { data } = await api.get(`/widgets/${widgetId}`);

      setWidgetData(data);
    } catch (error) {
      showResponseError(error);
    }
  };

  return { widgetData, currentMessage };
}
