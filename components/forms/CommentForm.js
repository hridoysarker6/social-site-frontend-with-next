export const CommentForm = ({ addComment, comment, setComment }) => {
  return (
    <>
      <form onSubmit={(e) => addComment(e)}>
        <input
          type={"text"}
          placeholder="Write something..."
          value={comment}
          className="form-control"
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="btn btn-primary btn-m btn-block mt-3">Submit</button>
      </form>
    </>
  );
};

export default CommentForm;
