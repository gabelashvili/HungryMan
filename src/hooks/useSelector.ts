import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { RootState } from '../store/configureStore';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
