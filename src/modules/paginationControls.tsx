import React from 'react';
import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationControlsProps {
  page: number;
  setPage: (page: number) => void;
  isAtStart: boolean;
}

// Future - handle disabled state for forward button when at end of data / for back button when at start of data.

const PaginationControls: React.FC<PaginationControlsProps> = ({ page, setPage, isAtStart }) => {
  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <ButtonGroup display="flex" justifyContent={"space-between"}>
      <Button onClick={() => handlePageChange(page - 1)} isDisabled={isAtStart}>
        <IoIosArrowBack />
      </Button>
      <Text marginBottom={".5rem"} fontWeight={600}>Page {page}</Text>
      <Button onClick={() => handlePageChange(page + 1)}>
        <IoIosArrowForward />
      </Button>
    </ButtonGroup>
  );
};

export default PaginationControls;
