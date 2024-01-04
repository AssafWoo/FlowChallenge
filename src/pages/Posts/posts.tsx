import { ColumnDef } from "@tanstack/react-table";
import { Post } from "../../types/types";
import EditableCell from "../../components/Table/editableCell";
import Table from "../../components/Table/table";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { deletePost } from "../../api";
import { useQueryClient } from "react-query";
import { useCombinedPostData } from "../../hooks/useCombinedData";
import PaginationControls from "../../modules/paginationControls";

// Future - fix the bug where the table doesn't update like it should when the user is edited
// Future - add filtering as requested in the challenge.

const PostsPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { combinedData, isLoading, isError } = useCombinedPostData(page);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;


  const deletePostHandler = async (postId: number) => {
    try {
      await deletePost(postId);
      queryClient.invalidateQueries("posts");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const onEditSuccess = () => {
    queryClient.invalidateQueries("posts");
    queryClient.invalidateQueries("users");
  };

  // Future - extract this to a separate file
  
  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "id",
      header: "Post ID",
      cell: (info) => <span>{info.row.original.id}</span>,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <EditableCell
          initialValue={row.original.title}
          itemId={row.original.id}
          field="title"
          dataType="post"
          onEditSuccess={onEditSuccess}
        />
      ),
    },
    {
      accessorKey: "userName",
      header: "User Name",
      cell: ({ row }) => (
        <EditableCell
          initialValue={row.original.userName}
          itemId={row.original.userId}
          field="username"
          dataType="user"
          onEditSuccess={onEditSuccess}
        />
      ),
    },
    {
      accessorKey: "userCompany",
      header: "User Company",
      cell: ({ row }) => (
        <EditableCell
          initialValue={row.original.userCompany}
          itemId={row.original.userId}
          field="company.name"
          dataType="user"
          onEditSuccess={onEditSuccess}
        />
      ),
    },
    {
      accessorKey: "comments",
      header: "Number of Comments",
      cell: (info) => <span>{info.row.original.comments}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          bg="transparent"
          _hover={{ bg: "transparent" }}
          onClick={() => deletePostHandler(row.original.id)}
        >
          <FaTrash color="red" /> 
        </Button>
        // Future - move to a color constant
      ),
    },
  ];

  return (
    <div>
      <h1>Posts</h1>
      {combinedData && (
        <>
          <Table columns={columns} data={combinedData} />
          <PaginationControls page={page} setPage={setPage} isAtStart={page === 1} />
        </>
      )}
    </div>
  );
};

export default PostsPage;
