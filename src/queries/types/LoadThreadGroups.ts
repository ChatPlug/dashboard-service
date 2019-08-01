/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoadThreadGroups
// ====================================================

export interface LoadThreadGroups_threadGroups_threads_service {
  __typename: "ServiceInstance";
  name: string;
  id: string;
}

export interface LoadThreadGroups_threadGroups_threads {
  __typename: "Thread";
  id: string;
  originId: string;
  name: string;
  service: LoadThreadGroups_threadGroups_threads_service;
}

export interface LoadThreadGroups_threadGroups {
  __typename: "ThreadGroup";
  id: string;
  name: string;
  threads: LoadThreadGroups_threadGroups_threads[];
}

export interface LoadThreadGroups {
  threadGroups: LoadThreadGroups_threadGroups[];
}
