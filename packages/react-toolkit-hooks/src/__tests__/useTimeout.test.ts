import { act, renderHook, waitFor } from '@testing-library/react';
import useTimeout from '../hooks/useTimeout';

describe('useTimeout', () => {
  it('Verify the timeout triggers the callback', async () => {
    const timeoutFn = jest.fn();
    renderHook(() => useTimeout(timeoutFn, 100));
    await waitFor(() => expect(timeoutFn).toBeCalled());
  });

  it('Verify the timeout gets cleared', async () => {
    const timeoutFn = jest.fn();
    const { result } = renderHook(() => useTimeout(timeoutFn, 1000));
    const { clear } = result.current;

    act(() => clear());
    await waitFor(() => expect(timeoutFn).not.toHaveBeenCalled());
  });

  it('Verify the timeout gets reset', async () => {
    const timeoutFn = jest.fn();
    const { result } = renderHook(() => useTimeout(timeoutFn, 500));
    const { reset } = result.current;

    act(() => reset());
    await waitFor(() => expect(timeoutFn).toBeCalledTimes(1));
  });
});
