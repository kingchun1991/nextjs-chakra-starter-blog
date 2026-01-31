/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  Box,
  Flex,
  Heading,
  Highlight,
  HStack,
  Icon,
  Link,
  Text,
} from '@chakra-ui/react';
import { LuFileText, LuTags } from 'react-icons/lu';

import { plainify, titleify } from '@/lib/utils/text-converter';

export interface ISearchItem {
  group: string;
  slug: string;
  frontmatter: {
    title: string;
    summary: string;
    image?: string;
    description?: string;
    categories?: Array<string>;
    tags?: Array<string>;
  };
  content: string;
}

export interface ISearchGroup {
  group: string;
  groupItems: Array<{
    slug: string;
    frontmatter: {
      title: string;
      summary: string;
      image?: string;
      description?: string;
      categories?: Array<string>;
      tags?: Array<string>;
    };
    content: string;
  }>;
}

export function SearchResult({
  searchResult,
  searchString,
}: {
  searchResult: Array<ISearchItem>;
  searchString: string;
}) {
  // const router = useRouter();

  const generateSearchGroup = (searchResult: Array<ISearchItem>) => {
    return searchResult.reduce(
      (groups, item) => {
        const groupIndex = groups.findIndex(
          (group) => group.group === item.group
        );
        if (groupIndex === -1) {
          groups.push({
            group: item.group,
            groupItems: [item],
          });
        } else {
          groups[groupIndex].groupItems.push(item);
        }
        return groups;
      },
      [] as Array<ISearchGroup>
    );
  };

  const finalResult = generateSearchGroup(searchResult);

  const matchUnderline = (text: string, substring: string) => {
    return (
      <Highlight
        query={substring}
        styles={{
          textDecoration: 'underline',
        }}
      >
        {text}
      </Highlight>
    );
  };

  // match marker
  const matchMarker = (text: string, substring: string) => {
    return (
      <Highlight
        query={substring}
        styles={{
          backgroundColor: 'yellow', // Example highlight style
        }}
      >
        {text}
      </Highlight>
    );
  };

  // match content
  const matchContent = (content: string, substring: string) => {
    const plainContent = plainify(content);
    const position = plainContent
      .toLowerCase()
      .indexOf(substring.toLowerCase());

    // Find the start of the word containing the substring
    let wordStart = position;
    while (wordStart > 0 && plainContent[wordStart - 1] !== ' ') {
      wordStart--;
    }

    const matches = plainContent.substring(
      wordStart,
      substring.length + position
    );
    const matchesAfter = plainContent.substring(
      substring.length + position,
      substring.length + position + 80
    );
    return (
      <>
        {matchMarker(matches, substring)}
        {matchesAfter}
      </>
    );
  };

  return (
    <Box className="search-wrapper-body">
      {searchString ? (
        <Box className="search-result">
          {finalResult.length > 0 ? (
            finalResult.map((result) => (
              <Box className="search-result-group" key={result.group}>
                <Heading
                  as="h1"
                  // letterSpacing="tight"
                  className="search-result-group-title"
                  mb={2}
                  size="lg"
                >
                  {titleify(result.group)}
                </Heading>

                {result.groupItems.map((item) => (
                  <Flex
                    align="center"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    className="search-result-item"
                    gap="2"
                    id="searchItem"
                    key={item.slug}
                    m={2}
                    p={4}
                  >
                    {/* <Box className="search-result-item-image" flex="1">
                      <Image
                        src={
                          item.frontmatter.image
                            ? item.frontmatter.image
                            : `${siteConfig.url}/api/og/cover?heading=${encodeURIComponent(
                                item.frontmatter.title
                              )}&text=${encodeURIComponent(
                                item.frontmatter.summary
                              )}&template=plain&center=true`
                        }
                        alt={item.frontmatter.title}
                        width={useBreakpointValue({ base: '100', md: '160' })}
                        height={useBreakpointValue({ base: '100', md: '100' })}
                      />
                    </Box> */}

                    <Box className="search-result-item-body" flex="3">
                      <Link
                        className="search-result-item-title search-result-item-link"
                        href={`/${item.slug}`}
                      >
                        <Heading as="h3" fontWeight="medium" mb={1} size="md">
                          {matchContent(item.frontmatter.title, searchString)}
                        </Heading>
                      </Link>
                      {item.frontmatter.description && (
                        <Text className="search-result-item-description">
                          {matchUnderline(
                            item.frontmatter.description,
                            searchString
                          )}
                        </Text>
                      )}
                      {item.content && (
                        <Text className="search-result-item-content">
                          {matchContent(item.content, searchString)}
                        </Text>
                      )}
                      <Box className="search-result-item-taxonomies">
                        {item.frontmatter.categories && (
                          <HStack gap={2}>
                            <Icon>
                              <LuFileText />
                            </Icon>
                            {item.frontmatter.categories.map(
                              (category, index) => (
                                <Text key={category}>
                                  {matchUnderline(category, searchString)}
                                  {item.frontmatter.categories &&
                                    index !==
                                      item.frontmatter.categories.length -
                                        1 && <>, </>}
                                </Text>
                              )
                            )}
                          </HStack>
                        )}
                        {item.frontmatter.tags && (
                          <HStack gap={2}>
                            <Icon>
                              <LuTags />
                            </Icon>
                            {item.frontmatter.tags.map((tag, index) => (
                              <Text key={tag}>
                                {matchUnderline(tag, searchString)}
                                {item.frontmatter.tags &&
                                  index !==
                                    item.frontmatter.tags.length - 1 && <>, </>}
                              </Text>
                            ))}
                          </HStack>
                        )}
                      </Box>
                    </Box>
                  </Flex>
                ))}
              </Box>
            ))
          ) : (
            <Box className="search-result-empty" p={8} textAlign="center">
              <Icon as={LuFileText} boxSize="42px" />
              <Text className="mt-4">
                No results for &quot;<strong>{searchString}</strong>&quot;
              </Text>
            </Box>
          )}
        </Box>
      ) : (
        <Box className="py-8 text-center">Type something to search...</Box>
      )}
    </Box>
  );
}

// export default SearchResult;
