export default function PostCard() {
  return (
    <a
      href="#"
      className="w-full md:max-w-[300px] max-h-[500px] bg-white border border-gray-200 rounded-lg shadow hover:dark:bg-gray-300"
    >
      <div>
        <img
          className="rounded-t-lg"
          src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Noteworthy technology acquisitions 2021
          </h5>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </a>
  );
}
