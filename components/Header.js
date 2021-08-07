import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  GlobeAltIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const resetInput = () => {
    setSearchInput("/map");
  };

  const search = () => {
    // router.push("/search");
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-gradient-to-r from-green-100 to-blue-200  shadow-md p-5 md:px-10 bg-transparent ">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      <div className="flex  items-center md:border-2 md:rounded-full py-2 md:shadow-sm border-red-500 mr-2">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400 border-b-2 border-red-500 md:border-0"
          type="text"
          placeholder={placeholder || "Start your search"}
        />
        <SearchIcon
          onClick={search}
          className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer  md:mx-2"
        />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-2 justify-end text-gray-900">
        <p className="hidden md:inline cursor-pointer p-3 hover:bg-gray-100 rounded-full ">
          Become a host
        </p>
        <GlobeAltIcon className="h-9 p-2 hover:bg-gray-100  rounded-full cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer hover:shadow-lg ">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-3 ">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#fd5B61"]}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              type="number"
              min={1}
              className="w-12 outline-none text-red-600 pl-2 bg-transparent"
            />
          </div>

          <div className="flex mx-20 h-10">
            <button
              onClick={resetInput}
              className="flex-grow mr-1 text-gray-700 border-2 hover:bg-blue-300 rounded-3xl hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={search}
              className="flex-grow text-red-600 border-2  hover:bg-red-300 rounded-full hover:text-white"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
