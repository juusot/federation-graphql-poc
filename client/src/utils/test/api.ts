import { UseQueryState } from 'urql/dist/types/hooks/useQuery';

type Action = () => void;

interface Response extends Omit<UseQueryState, 'fetching' | 'error' | 'stale'> {
  fetching?: boolean | undefined;
  error?: boolean | undefined;
}

interface QueryArguments {
  response?: Response;
  action?: Action;
}

export function query({ response, action }: QueryArguments): [Response, Action] {
  const defaultResponse: Response = {
    fetching: false,
    ...response,
  };
  const defaultAction =
    action ||
    (() => {
      return 'smoke';
    });
  return [defaultResponse, defaultAction];
}
