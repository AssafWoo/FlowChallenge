import {
    Box,
    Input,
    InputGroup,
    InputLeftAddon,
  } from "@chakra-ui/react";
  import { IoIosSearch } from "react-icons/io";
  
  type SearchAndFilterBox = {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  };
  
  // Future - make this a reusable component that can be used for filtering as well, also as a search for multiple tables.
  const Search = ({
    searchTerm,
    setSearchTerm,
  }: SearchAndFilterBox) => {
  
  
    return (
      <Box display="flex" justifyContent={"space-between"} margin="1rem 0">
        <InputGroup>
          <InputLeftAddon>
            <IoIosSearch />
          </InputLeftAddon>
          <Input
            placeholder="Search posts..." // Change this to be more dynamic
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            flex="2 0 60%"
            marginRight=".5rem"
            borderRadius="15px"
          />
        </InputGroup>
      
      </Box>
    );
  };
  
  export default Search;
  