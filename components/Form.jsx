import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col font-sans'>
      <h1 className='head_text text-left'>
        <span className='violet_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type}, explore and share your code and innovative ideas with the global programming community on CodeSync
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your code and Ideas
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write or paste your code and ideas here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag or Title{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-2.5 text-sm bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full text-white hover:from-fuchsia-600 hover:to-pink-600'
          >
            {/* {submitting ? `${type}ing...` : type} */}
            {submitting?`Creating...`: type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;