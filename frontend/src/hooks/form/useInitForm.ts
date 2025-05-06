import { useEffect, useRef } from 'react'
import { useSuspenseQuery, UseSuspenseQueryOptions } from '@tanstack/react-query'
import useFormStore, { FormStore } from '@/store/form/useFormStore'

export const useInitFormQuery = <TData, TSchema>(
  queryOptions: UseSuspenseQueryOptions<TData>,
  handler: (v: TData) => TSchema,
) => {
  const { init, isEmpty, form } = useFormStore((state: FormStore<TSchema>) => ({
    init: state.commit,
    isEmpty: state.isEmpty,
    form: state.form,
  }))
  const initForm = useRef<TSchema | undefined>(form)

  const { data } = useSuspenseQuery(queryOptions)

  useEffect(() => {
    if (isEmpty()) {
      initForm.current = handler(data)
      init(initForm.current)
    }
  }, [data, handler, init, isEmpty])

  return { initForm: initForm.current, loadedData: data }
}

export const useInitForm = <T>(defaulForm: T) => {
  const { init, isEmpty, form } = useFormStore((state: FormStore<T>) => ({
    init: state.commit,
    isEmpty: state.isEmpty,
    form: state.form,
  }))
  const initForm = useRef<T | undefined>(form)

  useEffect(() => {
    if (isEmpty()) {
      initForm.current = defaulForm
      init(initForm.current)
    }
  }, [defaulForm, init, isEmpty])

  return { initForm: initForm.current }
}
