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
  name: Scalars["String"];
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
  fieldValues: Array<ConfigurationResult>;
};

export type ConfigurationResult = {
  __typename?: "ConfigurationResult";
  name: Scalars["String"];
  value: Scalars["String"];
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
  createNewInstance: NewServiceInstanceCreated;
  setSearchResponse?: Maybe<SearchResponse>;
  searchThreadsInService?: Maybe<SearchResponse>;
};

export type MutationSendMessageArgs = {
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
  status?: Maybe<InstanceStatus>;
};

export type MutationCreateNewInstanceArgs = {
  serviceModuleName: Scalars["String"];
  instanceName: Scalars["String"];
};

export type MutationSetSearchResponseArgs = {
  forQuery: Scalars["String"];
  threads: Array<ThreadSearchResultInput>;
};

export type MutationSearchThreadsInServiceArgs = {
  q: Scalars["String"];
  instanceID: Scalars["String"];
};

export type NewServiceInstanceCreated = {
  __typename?: "NewServiceInstanceCreated";
  instance: ServiceInstance;
  accessToken: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  messages: Array<Message>;
  instances: Array<ServiceInstance>;
  services: Array<Service>;
  threadGroups: Array<ThreadGroup>;
};

export type SearchRequest = {
  __typename?: "SearchRequest";
  query: Scalars["String"];
};

export type SearchResponse = {
  __typename?: "SearchResponse";
  forQuery: Scalars["String"];
  threads: Array<ThreadSearchResult>;
};

export type Service = {
  __typename?: "Service";
  name: Scalars["String"];
  displayName: Scalars["String"];
  description: Scalars["String"];
  version: Scalars["String"];
  type: Scalars["String"];
  entryPoint: Scalars["String"];
};

export type ServiceInstance = {
  __typename?: "ServiceInstance";
  id: Scalars["ID"];
  name: Scalars["String"];
  status: InstanceStatus;
  service: Service;
};

export type Subscription = {
  __typename?: "Subscription";
  messageReceived: MessagePayload;
  configurationReceived: ConfigurationResponse;
  subscribeToSearchRequests: SearchRequest;
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
  iconUrl: Scalars["String"];
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
  iconUrl?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
};

export type ThreadSearchResult = {
  __typename?: "ThreadSearchResult";
  name: Scalars["String"];
  iconUrl?: Maybe<Scalars["String"]>;
  originId: Scalars["String"];
};

export type ThreadSearchResultInput = {
  name: Scalars["String"];
  originId: Scalars["String"];
  iconUrl?: Maybe<Scalars["String"]>;
};
export type AddThreadToGroupMutationVariables = {
  originId: Scalars["String"];
  iconUrl: Scalars["String"];
  instanceId: Scalars["String"];
  groupId: Scalars["ID"];
  name: Scalars["String"];
};

export type AddThreadToGroupMutation = { __typename?: "Mutation" } & {
  addThreadToGroup: { __typename?: "ThreadGroup" } & Pick<
    ThreadGroup,
    "id" | "name"
  > & {
      threads: Array<
        { __typename?: "Thread" } & Pick<Thread, "id" | "originId" | "name"> & {
            service: { __typename?: "ServiceInstance" } & Pick<
              ServiceInstance,
              "name" | "id"
            > & {
                service: { __typename?: "Service" } & Pick<
                  Service,
                  | "name"
                  | "displayName"
                  | "version"
                  | "type"
                  | "entryPoint"
                  | "description"
                >;
              };
          }
      >;
    };
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

export type SearchThreadsInServiceMutationVariables = {
  q: Scalars["String"];
  instanceID: Scalars["String"];
};

export type SearchThreadsInServiceMutation = { __typename?: "Mutation" } & {
  searchThreadsInService: Maybe<
    { __typename?: "SearchResponse" } & Pick<SearchResponse, "forQuery"> & {
        threads: Array<
          { __typename?: "ThreadSearchResult" } & Pick<
            ThreadSearchResult,
            "name" | "iconUrl" | "originId"
          >
        >;
      }
  >;
};

export type LoadInstancesQueryVariables = {};

export type LoadInstancesQuery = { __typename?: "Query" } & {
  instances: Array<
    { __typename?: "ServiceInstance" } & Pick<
      ServiceInstance,
      "name" | "id"
    > & {
        service: { __typename?: "Service" } & Pick<
          Service,
          | "name"
          | "displayName"
          | "version"
          | "type"
          | "entryPoint"
          | "description"
        >;
      }
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
              > & {
                  service: { __typename?: "Service" } & Pick<
                    Service,
                    | "name"
                    | "displayName"
                    | "version"
                    | "type"
                    | "entryPoint"
                    | "description"
                  >;
                };
            }
        >;
      }
  >;
};

export const AddThreadToGroupDocument = gql`
  mutation addThreadToGroup(
    $originId: String!
    $iconUrl: String!
    $instanceId: String!
    $groupId: ID!
    $name: String!
  ) {
    addThreadToGroup(
      input: {
        originId: $originId
        iconUrl: $iconUrl
        instanceId: $instanceId
        groupId: $groupId
        name: $name
      }
    ) {
      id
      name
      threads {
        id
        originId
        name
        service {
          name
          id
          service {
            name
            displayName
            version
            type
            entryPoint
            description
          }
        }
      }
    }
  }
`;
export type AddThreadToGroupMutationFn = ReactApollo.MutationFn<
  AddThreadToGroupMutation,
  AddThreadToGroupMutationVariables
>;
export type AddThreadToGroupComponentProps = Omit<
  ReactApollo.MutationProps<
    AddThreadToGroupMutation,
    AddThreadToGroupMutationVariables
  >,
  "mutation"
>;

export const AddThreadToGroupComponent = (
  props: AddThreadToGroupComponentProps
) => (
  <ReactApollo.Mutation<
    AddThreadToGroupMutation,
    AddThreadToGroupMutationVariables
  >
    mutation={AddThreadToGroupDocument}
    {...props}
  />
);

export type AddThreadToGroupProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    AddThreadToGroupMutation,
    AddThreadToGroupMutationVariables
  >
> &
  TChildProps;
export function withAddThreadToGroup<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AddThreadToGroupMutation,
    AddThreadToGroupMutationVariables,
    AddThreadToGroupProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    AddThreadToGroupMutation,
    AddThreadToGroupMutationVariables,
    AddThreadToGroupProps<TChildProps>
  >(AddThreadToGroupDocument, {
    alias: "withAddThreadToGroup",
    ...operationOptions
  });
}

export function useAddThreadToGroupMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    AddThreadToGroupMutation,
    AddThreadToGroupMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    AddThreadToGroupMutation,
    AddThreadToGroupMutationVariables
  >(AddThreadToGroupDocument, baseOptions);
}
export type AddThreadToGroupMutationHookResult = ReturnType<
  typeof useAddThreadToGroupMutation
>;
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
export const SearchThreadsInServiceDocument = gql`
  mutation searchThreadsInService($q: String!, $instanceID: String!) {
    searchThreadsInService(q: $q, instanceID: $instanceID) {
      forQuery
      threads {
        name
        iconUrl
        originId
      }
    }
  }
`;
export type SearchThreadsInServiceMutationFn = ReactApollo.MutationFn<
  SearchThreadsInServiceMutation,
  SearchThreadsInServiceMutationVariables
>;
export type SearchThreadsInServiceComponentProps = Omit<
  ReactApollo.MutationProps<
    SearchThreadsInServiceMutation,
    SearchThreadsInServiceMutationVariables
  >,
  "mutation"
>;

export const SearchThreadsInServiceComponent = (
  props: SearchThreadsInServiceComponentProps
) => (
  <ReactApollo.Mutation<
    SearchThreadsInServiceMutation,
    SearchThreadsInServiceMutationVariables
  >
    mutation={SearchThreadsInServiceDocument}
    {...props}
  />
);

export type SearchThreadsInServiceProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    SearchThreadsInServiceMutation,
    SearchThreadsInServiceMutationVariables
  >
> &
  TChildProps;
export function withSearchThreadsInService<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SearchThreadsInServiceMutation,
    SearchThreadsInServiceMutationVariables,
    SearchThreadsInServiceProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    SearchThreadsInServiceMutation,
    SearchThreadsInServiceMutationVariables,
    SearchThreadsInServiceProps<TChildProps>
  >(SearchThreadsInServiceDocument, {
    alias: "withSearchThreadsInService",
    ...operationOptions
  });
}

export function useSearchThreadsInServiceMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    SearchThreadsInServiceMutation,
    SearchThreadsInServiceMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    SearchThreadsInServiceMutation,
    SearchThreadsInServiceMutationVariables
  >(SearchThreadsInServiceDocument, baseOptions);
}
export type SearchThreadsInServiceMutationHookResult = ReturnType<
  typeof useSearchThreadsInServiceMutation
>;
export const LoadInstancesDocument = gql`
  query loadInstances {
    instances {
      name
      id
      service {
        name
        displayName
        version
        type
        entryPoint
        description
      }
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
          service {
            name
            displayName
            version
            type
            entryPoint
            description
          }
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
