import RepositoryList from "../../components/RepositoryList";
import { MockedProvider } from "@apollo/client/testing";
import { waitFor, cleanup } from "@testing-library/react-native";
import { render, screen } from "../../utils/customRender";
import { GET_REPOSITORIES } from "../../graphql/queries";
import React, { useEffect, useState } from "react";

// import { InMemoryCache } from '@apollo/client';

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
  },
  edges: [
    {
      node: {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
      },
      cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
    },
    {
      node: {
        id: "async-library.react-async",
        fullName: "async-library/react-async",
        description: "Flexible promise-based React data loader",
        language: "JavaScript",
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
      },
      cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    },
  ],
};

const mocks = [
  {
    request: {
      query: GET_REPOSITORIES,
    },
    result: {
      data: {
        repositories: { ...repositories },
      },
    },
  },
];

describe("RepositoryList", () => {
  afterEach(cleanup);
  it("renders repository information correctly", async () => {
    const { debug, getByText, queryAllByText, getByTestId, getAllByTestId } =
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <RepositoryList />
        </MockedProvider>
      );

    // const repositoryItems = await findAllByRole('listitem');
    // console.log(repositoryItems)

    await waitFor(() => {
      expect(getByTestId("repositoryList")).toBeDefined();
    });

    const firstRepoItemContainer = getAllByTestId(
      `repo-item-${repositories.edges[0].node.id}`
    )[0];
    expect(firstRepoItemContainer).toBeDefined();
    // debug();
    getByText("jaredpalmer/formik");
    repositories.edges.forEach((mockedItem) => {
      getByText(mockedItem.node.fullName);
      getByText(mockedItem.node.description);
      getByText(mockedItem.node.language);
      getByText(mockedItem.node.forksCount.toString());
      getByText(mockedItem.node.ratingAverage.toString());
      expect(
        queryAllByText(mockedItem.node.reviewCount.toString()).length
      ).toBe(2);
    });
    // expect(firstRepoItemContainer.children).toHaveTextContent("Build forms in React, without the tears");
    // expect(firstRepoItemContainer.children).toHaveTextContent("TypeScript");
    // expect(firstRepoItemContainer.children).toHaveTextContent("1619");
  });
});
