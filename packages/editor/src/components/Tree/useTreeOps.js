import { useEffect } from 'react';
import PubSub from '../../common/pubsub';

const pubSub = new PubSub();

export const useTreeOpsPubSub = () => {
  return pubSub.notify;
};

export const useTreeOps = callback => {
  useEffect(() => {
    const unsubscribe = pubSub.sibscribe(callback);
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
