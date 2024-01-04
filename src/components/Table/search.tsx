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
            placeholder="Search posts..."
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
  