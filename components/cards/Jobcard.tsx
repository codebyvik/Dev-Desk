/* eslint-disable camelcase */
import { processJobTitle } from "@/lib/utils";
import { Job } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface JobLocationProps {
  city?: string;
  country?: string;
  state?: string;
}

const JobLocation = ({ city, country, state }: JobLocationProps) => {
  return (
    <div className="background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
      <Image
        src={`https://flagsapi.com/${country}/flat/64.png`}
        alt="country symbol"
        width={16}
        height={16}
        className="rounded-full"
      />
      <p className="body-medium text-dark400_light700">
        {city && `${city} ,`} {state && `${state} ,`} {country && `${country}`}
      </p>
    </div>
  );
};

const Jobcard = async ({ job }: { job: Job }) => {
  const {
    employer_logo,
    employer_website,
    job_employment_type,
    job_title,
    job_description,
    job_apply_link,
    job_city,
    job_state,
    job_country,
    job_min_salary,
    job_max_salary,
  } = job;

  return (
    <section className="background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8">
      <div className="flex w-full justify-end sm:hidden">
        <JobLocation city={job_city} country={job_country} state={job_state} />
      </div>
      <div className="flex items-center gap-6">
        {employer_logo ? (
          <Link
            href={employer_website ?? "/jobs"}
            className="background-light800_dark400 relative size-16 rounded-xl"
          >
            <Image
              src={employer_logo}
              fill
              alt="Company_logo"
              className="size-full object-contain p-2"
            />
          </Link>
        ) : (
          <Image
            src="/assets/images/site-logo.svg"
            alt="default site logo"
            width={64}
            height={64}
            className="rounded-[10px]"
          />
        )}
      </div>

      <div className="w-full">
        <div className="flex-between flex-wrap gap-2">
          <p className="base-semibold text-dark200_light900">{processJobTitle(job_title)}</p>
          <div className="hidden sm:flex">
            <JobLocation city={job_city} country={job_country} state={job_state} />
          </div>
        </div>

        <p className="body-regular text-dark500_light700  mt-2 line-clamp-2">{job_description}</p>

        <div className="flex-between mt-8 flex-wrap gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Image src="/assets/icons/clock-2.svg" alt="clock" width={20} height={20} />
              <p className="body-medium text-light-500">{job_employment_type}</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/currency-dollar-circle.svg"
                alt="dollar symbol"
                width={20}
                height={20}
              />

              <p className="body-medium text-light-500">
                {job_min_salary && job_max_salary
                  ? `${job_min_salary} - ${job_max_salary}`
                  : "Not disclosed"}
              </p>
            </div>
          </div>

          <Link
            href={job_apply_link ?? "/jobs"}
            target="_blank"
            className="flex items-center gap-2"
          >
            <p className="body-semibold primary-text-gradient">View job</p>

            <Image
              src="/assets/icons/arrow-up-right.svg"
              alt="arrow up right"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Jobcard;
