/* eslint-disable no-console */
import { showLogger } from '@/constant/env'

function formatLogComment(comment?: string): string {
  return comment ? `${comment}:\n` : ''
}

/**
 * A logger function that will only logs on development
 * @param object - The object to log
 * @param comment - Optional comment to provide context
 */
export function logger(object: unknown, comment?: string): void {
  if (!showLogger) {
    return
  }

  console.log(
    '%c ============== INFO LOG ============== \n',
    'color: #22D3EE',
    formatLogComment(comment),
    object,
  )
}

/**
 * An error logger function that will only log errors in development
 * @param object - The object to log
 * @param comment - Optional comment to provide context
 */
export function errorLogger(object: unknown, comment?: string): void {
  if (!showLogger) {
    return
  }

  console.error(
    '%c ============== ERROR LOG ============== \n',
    'color: #EF4444',
    formatLogComment(comment),
    object,
  )
}
