import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from 'react-redux';
import { AppDispatch, RootState } from '..';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
