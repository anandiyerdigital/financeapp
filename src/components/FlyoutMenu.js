import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { Link } from "react-router-dom";

import {
  ArrowPathIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const solutions = [
  {
    name: "DigitalTextGeneration",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "/aitext",
    icon: ChartBarIcon,
  },
  {
    name: "DigitalImageGeneration",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "/aiimage",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "DigitalGTP",
    description: "Your customers' data will be safe and secure.",
    href: "/aigpt",
    icon: ShieldCheckIcon,
  },
  // {
  //   name: "DigitalImageClassifier",
  //   description: "Connect with third-party tools that you're already using.",
  //   href: "/aiimageclassifier",
  //   icon: Squares2X2Icon,
  // },
  {
    name: "Digital Crop Science",
    description:
      "Plant identification and disease identification ",
    href: "/aiDigitalcropscience",
    icon: ArrowPathIcon,
  },
  {
    name: "Digital Crop Science Health",
    description:
      "Disease Identification",
    href: "/aiDigitalcropsciencehealth",
    icon: DocumentChartBarIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FlyoutMenu() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? "text-gray-900" : "text-gray-500",
              "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            )}
          >
            <span>AI Tools</span>
            <ChevronDownIcon
              className={classNames(
                open ? "text-gray-600" : "text-gray-400",
                "ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-gray-500"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                  {solutions.map((item) => (
                    <div
                      key={item.name}
                      className="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50"
                    >
                      <Link to={item.href}>
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
