import gql from "graphql-tag";
import * as ReactApollo from "react-apollo";
import * as React from "react";
import * as ReactApolloHooks from "react-apollo-hooks";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Attachment = {
  __typename?: "Attachment";
  id: Scalars["ID"];
  originId: Scalars["String"];
  type: AttachmentType;
  sourceUrl: Scalars["String"];
};

export type AttachmentInput = {
  originId: Scalars["String"];
  type: AttachmentType;
  sourceUrl: Scalars["String"];
};

export enum AttachmentType {
  File = "FILE",
  Image = "IMAGE",
  Audio = "AUDIO",
  Video = "VIDEO"
}

export type ConfigurationField = {
  type: ConfigurationFieldType;
  defaultValue: Scalars["String"];
  optional: Scalars["Boolean"];
  hint: Scalars["String"];
  mask: Scalars["Boolean"];
};

export enum ConfigurationFieldType {
  Boolean = "BOOLEAN",
  String = "STRING",
  Number = "NUMBER"
}

export type ConfigurationRequest = {
  fields: Array<ConfigurationField>;
};

export type ConfigurationResponse = {
  __typename?: "ConfigurationResponse";
  fieldValues: Array<Scalars["String"]>;
};

export enum InstanceStatus {
  Running = "RUNNING",
  Initialized = "INITIALIZED",
  Configured = "CONFIGURED",
  ShuttingDown = "SHUTTING_DOWN",
  Stopped = "STOPPED"
}

export type Message = {
  __typename?: "Message";
  id: Scalars["ID"];
  originId: Scalars["String"];
  author: MessageAuthor;
  thread: Thread;
  body: Scalars["String"];
  threadGroupId: Scalars["ID"];
  attachments: Array<Attachment>;
};

export type MessageAuthor = {
  __typename?: "MessageAuthor";
  id: Scalars["ID"];
  originId: Scalars["String"];
  username: Scalars["String"];
  avatarUrl: Scalars["String"];
};

export type MessageAuthorInput = {
  originId: Scalars["String"];
  username: Scalars["String"];
  avatarUrl: Scalars["String"];
};

export type MessageInput = {
  body: Scalars["String"];
  author: MessageAuthorInput;
  attachments: Array<AttachmentInput>;
  originId: Scalars["String"];
  originThreadId: Scalars["String"];
  avatarUrl?: Maybe<Scalars["String"]>;
};

export type MessagePayload = {
  __typename?: "MessagePayload";
  targetThreadId: Scalars["ID"];
  message: Message;
};

export type Mutation = {
  __typename?: "Mutation";
  sendMessage: Message;
  createThreadGroup: ThreadGroup;
  deleteThreadGroup: Scalars["ID"];
  deleteServiceInstance: Scalars["ID"];
  deleteThread: Scalars["ID"];
  addThreadToGroup: ThreadGroup;
  setInstanceStatus: ServiceInstance;
  createNewInstance: ServiceInstance;
};

export type MutationSendMessageArgs = {
  instanceId: Scalars["ID"];
  input: MessageInput;
};

export type MutationCreateThreadGroupArgs = {
  name: Scalars["String"];
};

export type MutationDeleteThreadGroupArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteServiceInstanceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteThreadArgs = {
  id: Scalars["ID"];
};

export type MutationAddThreadToGroupArgs = {
  input?: Maybe<ThreadInput>;
};

export type MutationSetInstanceStatusArgs = {
  instanceId: Scalars["ID"];
  status?: Maybe<InstanceStatus>;
};

export type MutationCreateNewInstanceArgs = {
  serviceModuleName: Scalars["String"];
  instanceName: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  messages: Array<Message>;
  instances: Array<ServiceInstance>;
  services: Array<Service>;
  threadGroups: Array<ThreadGroup>;
};

export type Service = {
  __typename?: "Service";
  displayName: Scalars["String"];
  description: Scalars["String"];
  name: Scalars["String"];
};

export type ServiceInstance = {
  __typename?: "ServiceInstance";
  id: Scalars["ID"];
  name: Scalars["String"];
  status: InstanceStatus;
};

export type Subscription = {
  __typename?: "Subscription";
  messageReceived: MessagePayload;
  configurationReceived: ConfigurationResponse;
};

export type SubscriptionMessageReceivedArgs = {
  instanceId: Scalars["ID"];
};

export type SubscriptionConfigurationReceivedArgs = {
  configuration: ConfigurationRequest;
};

export type Thread = {
  __typename?: "Thread";
  name: Scalars["String"];
  originId: Scalars["String"];
  messages: Array<Message>;
  threadGroupId: Scalars["ID"];
  service: ServiceInstance;
  readonly?: Maybe<Scalars["Boolean"]>;
  id: Scalars["ID"];
};

export type ThreadGroup = {
  __typename?: "ThreadGroup";
  id: Scalars["ID"];
  name: Scalars["String"];
  messages: Array<Message>;
  threads: Array<Thread>;
};

export type ThreadInput = {
  instanceId: Scalars["String"];
  originId: Scalars["String"];
  groupId: Scalars["ID"];
  readonly?: Maybe<Scalars["Boolean"]>;
  name: Scalars["String"];
};
export type CreateThreadGroupMutationVariables = {
  name: Scalars["String"];
};

export type CreateThreadGroupMutation = { __typename?: "Mutation" } & {
  createThreadGroup: { __typename?: "ThreadGroup" } & Pick<
    ThreadGroup,
    "id" | "name"
  > & {
      threads: Array<{ __typename?: "Thread" } & Pick<Thread, "id" | "name">>;
    };
};

export type DeleteThreadMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteThreadMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteThread"
>;

export type DeleteThreadGroupMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteThreadGroupMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteThreadGroup"
>;

export type LoadInstancesQueryVariables = {};

export type LoadInstancesQuery = { __typename?: "Query" } & {
  instances: Array<
    { __typename?: "ServiceInstance" } & Pick<ServiceInstance, "name" | "id">
  >;
};

export type LoadThreadGroupsQueryVariables = {};

export type LoadThreadGroupsQuery = { __typename?: "Query" } & {
  threadGroups: Array<
    { __typename?: "ThreadGroup" } & Pick<ThreadGroup, "id" | "name"> & {
        threads: Array<
          { __typename?: "Thread" } & Pick<
            Thread,
            "id" | "originId" | "name"
          > & {
              service: { __typename?: "ServiceInstance" } & Pick<
                ServiceInstance,
                "name" | "id"
              >;
            }
        >;
      }
  >;
};

export const CreateThreadGroupDocument = gql`
  mutation createThreadGroup($name: String!) {
    createThreadGroup(name: $name) {
      id
      name
      threads {
        id
        name
      }
    }
  }
`;
export type CreateThreadGroupMutationFn = ReactApollo.MutationFn<
  CreateThreadGroupMutation,
  CreateThreadGroupMutationVariables
>;
export type CreateThreadGroupComponentProps = Omit<
  ReactApollo.MutationProps<
    CreateThreadGroupMutation,
    CreateThreadGroupMutationVariables
  >,
  "mutation"
>;

export const CreateThreadGroupComponent = (
  props: CreateThreadGroupComponentProps
) => (
  <ReactApollo.Mutation<
    CreateThreadGroupMutation,
    CreateThreadGroupMutationVariables
  >
    mutation={CreateThreadGroupDocument}
    {...props}
  />
);

export type CreateThreadGroupProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    CreateThreadGroupMutation,
    CreateThreadGroupMutationVariables
  >
> &
  TChildProps;
export function withCreateThreadGroup<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CreateThreadGroupMutation,
    CreateThreadGroupMutationVariables,
    CreateThreadGroupProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    CreateThreadGroupMutation,
    CreateThreadGroupMutationVariables,
    CreateThreadGroupProps<TChildProps>
  >(CreateThreadGroupDocument, {
    alias: "withCreateThreadGroup",
    ...operationOptions
  });
}

export function useCreateThreadGroupMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateThreadGroupMutation,
    CreateThreadGroupMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateThreadGroupMutation,
    CreateThreadGroupMutationVariables
  >(CreateThreadGroupDocument, baseOptions);
}
export type CreateThreadGroupMutationHookResult = ReturnType<
  typeof useCreateThreadGroupMutation
>;
export const DeleteThreadDocument = gql`
  mutation deleteThread($id: ID!) {
    deleteThread(id: $id)
  }
`;
export type DeleteThreadMutationFn = ReactApollo.MutationFn<
  DeleteThreadMutation,
  DeleteThreadMutationVariables
>;
export type DeleteThreadComponentProps = Omit<
  ReactApollo.MutationProps<
    DeleteThreadMutation,
    DeleteThreadMutationVariables
  >,
  "mutation"
>;

export const DeleteThreadComponent = (props: DeleteThreadComponentProps) => (
  <ReactApollo.Mutation<DeleteThreadMutation, DeleteThreadMutationVariables>
    mutation={DeleteThreadDocument}
    {...props}
  />
);

export type DeleteThreadProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteThreadMutation, DeleteThreadMutationVariables>
> &
  TChildProps;
export function withDeleteThread<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeleteThreadMutation,
    DeleteThreadMutationVariables,
    DeleteThreadProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteThreadMutation,
    DeleteThreadMutationVariables,
    DeleteThreadProps<TChildProps>
  >(DeleteThreadDocument, {
    alias: "withDeleteThread",
    ...operationOptions
  });
}

export function useDeleteThreadMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteThreadMutation,
    DeleteThreadMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteThreadMutation,
    DeleteThreadMutationVariables
  >(DeleteThreadDocument, baseOptions);
}
export type DeleteThreadMutationHookResult = ReturnType<
  typeof useDeleteThreadMutation
>;
export const DeleteThreadGroupDocument = gql`
  mutation deleteThreadGroup($id: ID!) {
    deleteThreadGroup(id: $id)
  }
`;
export type DeleteThreadGroupMutationFn = ReactApollo.MutationFn<
  DeleteThreadGroupMutation,
  DeleteThreadGroupMutationVariables
>;
export type DeleteThreadGroupComponentProps = Omit<
  ReactApollo.MutationProps<
    DeleteThreadGroupMutation,
    DeleteThreadGroupMutationVariables
  >,
  "mutation"
>;

export const DeleteThreadGroupComponent = (
  props: DeleteThreadGroupComponentProps
) => (
  <ReactApollo.Mutation<
    DeleteThreadGroupMutation,
    DeleteThreadGroupMutationVariables
  >
    mutation={DeleteThreadGroupDocument}
    {...props}
  />
);

export type DeleteThreadGroupProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    DeleteThreadGroupMutation,
    DeleteThreadGroupMutationVariables
  >
> &
  TChildProps;
export function withDeleteThreadGroup<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeleteThreadGroupMutation,
    DeleteThreadGroupMutationVariables,
    DeleteThreadGroupProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteThreadGroupMutation,
    DeleteThreadGroupMutationVariables,
    DeleteThreadGroupProps<TChildProps>
  >(DeleteThreadGroupDocument, {
    alias: "withDeleteThreadGroup",
    ...operationOptions
  });
}

export function useDeleteThreadGroupMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteThreadGroupMutation,
    DeleteThreadGroupMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteThreadGroupMutation,
    DeleteThreadGroupMutationVariables
  >(DeleteThreadGroupDocument, baseOptions);
}
export type DeleteThreadGroupMutationHookResult = ReturnType<
  typeof useDeleteThreadGroupMutation
>;
export const LoadInstancesDocument = gql`
  query loadInstances {
    instances {
      name
      id
    }
  }
`;
export type LoadInstancesComponentProps = Omit<
  ReactApollo.QueryProps<LoadInstancesQuery, LoadInstancesQueryVariables>,
  "query"
>;

export const LoadInstancesComponent = (props: LoadInstancesComponentProps) => (
  <ReactApollo.Query<LoadInstancesQuery, LoadInstancesQueryVariables>
    query={LoadInstancesDocument}
    {...props}
  />
);

export type LoadInstancesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LoadInstancesQuery, LoadInstancesQueryVariables>
> &
  TChildProps;
export function withLoadInstances<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoadInstancesQuery,
    LoadInstancesQueryVariables,
    LoadInstancesProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    LoadInstancesQuery,
    LoadInstancesQueryVariables,
    LoadInstancesProps<TChildProps>
  >(LoadInstancesDocument, {
    alias: "withLoadInstances",
    ...operationOptions
  });
}

export function useLoadInstancesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<LoadInstancesQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    LoadInstancesQuery,
    LoadInstancesQueryVariables
  >(LoadInstancesDocument, baseOptions);
}
export type LoadInstancesQueryHookResult = ReturnType<
  typeof useLoadInstancesQuery
>;
export const LoadThreadGroupsDocument = gql`
  query loadThreadGroups {
    threadGroups {
      id
      name
      threads {
        id
        originId
        name
        service {
          name
          id
        }
      }
    }
  }
`;
export type LoadThreadGroupsComponentProps = Omit<
  ReactApollo.QueryProps<LoadThreadGroupsQuery, LoadThreadGroupsQueryVariables>,
  "query"
>;

export const LoadThreadGroupsComponent = (
  props: LoadThreadGroupsComponentProps
) => (
  <ReactApollo.Query<LoadThreadGroupsQuery, LoadThreadGroupsQueryVariables>
    query={LoadThreadGroupsDocument}
    {...props}
  />
);

export type LoadThreadGroupsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LoadThreadGroupsQuery, LoadThreadGroupsQueryVariables>
> &
  TChildProps;
export function withLoadThreadGroups<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoadThreadGroupsQuery,
    LoadThreadGroupsQueryVariables,
    LoadThreadGroupsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    LoadThreadGroupsQuery,
    LoadThreadGroupsQueryVariables,
    LoadThreadGroupsProps<TChildProps>
  >(LoadThreadGroupsDocument, {
    alias: "withLoadThreadGroups",
    ...operationOptions
  });
}

export function useLoadThreadGroupsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    LoadThreadGroupsQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    LoadThreadGroupsQuery,
    LoadThreadGroupsQueryVariables
  >(LoadThreadGroupsDocument, baseOptions);
}
export type LoadThreadGroupsQueryHookResult = ReturnType<
  typeof useLoadThreadGroupsQuery
>;
