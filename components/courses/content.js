import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const Content = ({ content, title }) => {
  return (
    <div className="h-[92vh] py-4 w-full flex flex-col relative px-6 max-md:px-2">
      <div className="h-[92vh] absolute opacity-20 w-full flex flex-grow justify-center mx-auto items-center -z-10">
        <img
          src={`/${title}.png`}
          alt="title"
          className="w-96 h-96 object-contain rounded-xl mx-auto"
        />
      </div>

      {/* Scroll wrapper div */}
      <div className="h-[92vh] overflow-y-scroll pr-2">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            p: ({ node, ...props }) => (
              <p className="mb-3 text-base" {...props} />
            ),
            h1: ({ node, ...props }) => (
              <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-xl font-medium mt-4 mb-2" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="ml-6 list-disc" {...props} />
            ),
            code: ({ node, inline, className, children, ...props }) =>
              inline ? (
                <code className="bg-gray-100 px-1 rounded text-sm" {...props}>
                  {children}
                </code>
              ) : (
                <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto my-4">
                  <code {...props}>{children}</code>
                </pre>
              ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Content;
