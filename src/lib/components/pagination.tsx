/* eslint-disable react/prop-types */
import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Box>
      <ButtonGroup>
        <Button
          leftIcon={<FaChevronLeft />}
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            colorScheme={currentPage === index + 1 ? 'blue' : undefined}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          rightIcon={<FaChevronRight />}
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Pagination;
