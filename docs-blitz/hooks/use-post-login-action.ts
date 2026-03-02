import { useEffect } from "react"

export type PostLoginActionType =
  | "SAVE_THEME"
  | "AI_GENERATE_FROM_PAGE"
  | "AI_GENERATE_FROM_CHAT"
  | "AI_GENERATE_FROM_CHAT_SUGGESTION"
  | "AI_GENERATE_EDIT"
  | "AI_GENERATE_RETRY"
  | "SAVE_THEME_FOR_SHARE"
  | "SAVE_THEME_FOR_V0"
  | "CHECKOUT"
  | "LIKE_THEME"

export interface PostLoginActionPayload<T = unknown> {
  type: PostLoginActionType
  data?: T
}

export type StoredPostLoginAction = PostLoginActionPayload | null

type PostLoginHandler<T = unknown> = (data?: T) => void | Promise<void>

const handlers: Map<PostLoginActionType, PostLoginHandler> = new Map()
const readyActions: Set<PostLoginActionType> = new Set()
let pendingAction: StoredPostLoginAction = null

export function usePostLoginAction<T = unknown>(
  actionType: PostLoginActionType,
  handler: PostLoginHandler<T>
) {
  useEffect(() => {
    handlers.set(actionType, handler as PostLoginHandler)
    readyActions.add(actionType)

    if (pendingAction && pendingAction.type === actionType) {
      executePostLoginActionInternal(pendingAction)
      pendingAction = null
    }

    return () => {
      if (handlers.get(actionType)) {
        handlers.delete(actionType)
        readyActions.delete(actionType)
      }
    }
  }, [actionType, handler])
}

async function executePostLoginActionInternal(actionPayload: StoredPostLoginAction) {
  if (!actionPayload) return

  const handler = handlers.get(actionPayload.type)

  if (handler) {
    await handler(actionPayload.data)
  }
}

export async function executePostLoginAction(actionPayload: StoredPostLoginAction) {
  if (!actionPayload) return

  if (readyActions.has(actionPayload.type)) {
    await executePostLoginActionInternal(actionPayload)
  } else {
    pendingAction = actionPayload
  }
}
