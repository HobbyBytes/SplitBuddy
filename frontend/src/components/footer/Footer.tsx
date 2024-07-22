import { socialLinks, websiteUrl } from "@/constants/Social";

function Footer() {
  return (
    // sticky bottom-0
    <footer className="z-8 opacity-100 backdrop-blur-lg transition-opacity font-intervariable w-full px-0 text-gray-800 dark:bg-gray-900 dark:text-gray-400 sm:px-6">
      <div className="mx-auto w-full max-w-full px-6 py-4 sm:px-0 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          &#169; {new Date().getFullYear()}{" "}
          <a
            href={websiteUrl}
            target="blank"
            className="text-gray-800 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-200"
          >
            Hobby Bytes
          </a>
          &#8482;. All Rights Reserved.
        </span>
        <div className="flex flex-row items-end justify-between gap-4 md:justify-start">
          <ul className="mt-3 flex flex-wrap items-center gap-4 md:mt-0">
            {socialLinks.map((item) => (
              <li key={item.name} className="">
                <a href={item.url} target="blank">
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-xs md:text-sm hidden sm:block">
            Built with <span style={{ color: "#e25555" }}>&#9829;</span> by{" "}
            <a
              href="https://github.com/HobbyBytes"
              className="text-gray-800 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-200"
              title="HobbyBytes"
            >
              Hobby Bytes
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
