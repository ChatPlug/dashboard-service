/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateThreadGroup
// ====================================================

export interface CreateThreadGroup_createThreadGroup_threads {
  __typename: "Thread";
  id: string;
  name: string;
}

export interface CreateThreadGroup_createThreadGroup {
  __typename: "ThreadGroup";
  id: string;
  name: string;
  threads: CreateThreadGroup_createThreadGroup_threads[];
}

export interface CreateThreadGroup {
  createThreadGroup: CreateThreadGroup_createThreadGroup;
}

export interface CreateThreadGroupVariables {
  name: string;
}
