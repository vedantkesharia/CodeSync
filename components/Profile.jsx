import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='violet_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          >
            {/* <span className={`visibility-label ${post.visibility}`}> */}
            <span className="visibility-label">
      {post.visibility === "public" ? "Public" : "Private"}
    </span>
          </PromptCard>
        ))}
      </div>
    </section>
  );
};

export default Profile;
