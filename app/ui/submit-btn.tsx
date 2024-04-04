import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn btn-primary btn-block disabled:cursor-not-allowed"
      type="submit"
      id="submitButton"
      disabled={pending}
    >
      {pending ? (
        <div className=" h-5 w-5 animate-spin rounded-full border-2 border-current border-opacity-50"></div>
      ) : (
        <>
          <span>Submit</span>
        </>
      )}
    </button>
  );
}
