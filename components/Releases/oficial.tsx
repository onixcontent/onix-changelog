import "./markdown.css";
import { getOnixReleases } from "@/utils/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { FiExternalLink } from "react-icons/fi";

export default async function OficialReleases() {
  const releases = await getOnixReleases();

  return (
    <>
      {releases.splice(0, 4).map((release) => (
        <div
          key={release.id}
          className="flex flex-col justify-center w-full h-full p-4 border-accent2 border rounded-lg bg-dark"
        >
          <div className={"flex flex-row justify-between"}>
            <h3 className={"text-xl font-bold"}>{release.name}</h3>
            <Link
              href={release.html_url}
              rel={"nofollow"}
              target={"_blank"}
              aria-label={"Go to release"}
              title={"Go to release"}
            >
              <FiExternalLink className={"w-5 h-5 cursor-pointer"} />
            </Link>
          </div>
          <div className={"flex flex-row flex-wrap items-center mt-3"}>
            <Image
              src={release.author.avatar_url}
              alt={"author image"}
              className={"w-7 h-7 rounded-full mr-2"}
              width={100}
              height={100}
            />
            <p>
              <b>{release.author.login}</b> released this{" "}
              {moment(release.created_at).fromNow()}
            </p>
            <p className={"ml-2 text-blue-500"}>
              <Link
                href={`https://github.com/onixcontent/bug-tracker/commit/${release.target_commitish}`}
                rel={"nofollow"}
                target={"blank"}
              >
                {release.target_commitish.startsWith("")
                  ? release.target_commitish
                  : release.target_commitish.substring(0, 6)}
              </Link>
            </p>
          </div>
          <div className="divider"></div>
          <div className={"markdown-body"}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                li: ({ children }: any) => {
                  const text = children[0];
                  const newText = text
                    .split(" ")
                    .map((word: string) => {
                      if (word.startsWith("#")) {
                        return (
                          <Link
                            key={word}
                            href={`https://github.com/onixcontent/bug-tracker/pull/${word.replaceAll(
                              "#",
                              ""
                            )}`}
                            rel={"nofollow"}
                            target={"_blank"}
                          >
                            <span className={"text-blue-500"}>{word}</span>
                          </Link>
                        );
                      } else {
                        return word;
                      }
                    })
                    .reduce(
                      (acc: React.ReactNode, curr: React.ReactNode) => (
                        <>
                          {acc} {curr}
                        </>
                      ),
                      null
                    );

                  return <li>{newText}</li>;
                },
                p: ({ children }: any) => {
                  const text = children[0];
                  const newText = text
                    .split(" ")
                    .map((word: string) => {
                      if (word.startsWith("@")) {
                        if (word.endsWith(",")) {
                          return (
                            <>
                              <Link
                                key={word}
                                href={`https://github.com/${word
                                  .slice(0, -1)
                                  .replaceAll("@", "")}`}
                                rel={"nofollow"}
                                target={"_blank"}
                              >
                                <span className={"text-blue-500"}>
                                  {word.slice(0, -1)}
                                </span>
                              </Link>
                              ,
                            </>
                          );
                        } else {
                          return (
                            <Link
                              key={word}
                              href={`https://github.com/${word.replaceAll(
                                "@",
                                ""
                              )}`}
                              rel={"nofollow"}
                              target={"_blank"}
                            >
                              <span className={"text-blue-500"}>{word}</span>
                            </Link>
                          );
                        }
                      } else {
                        return word;
                      }
                    })
                    .reduce(
                      (acc: React.ReactNode, curr: React.ReactNode) => (
                        <>
                          {acc} {curr}
                        </>
                      ),
                      null
                    );

                  return <p>{newText}</p>;
                },
              }}
            >
              {release.body}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
}
