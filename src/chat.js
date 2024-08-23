import React from "react";
import Anisha from "https://tse3.mm.bing.net/th?id=OIP.iApVsqSNRuxoE1ynjRngOwHaEo&pid=Api&P=0";
import Shanai from "https://tse3.mm.bing.net/th?id=OIP.iApVsqSNRuxoE1ynjRngOwHaEo&pid=Api&P=0";
import Ali from "https://tse3.mm.bing.net/th?id=OIP.iApVsqSNRuxoE1ynjRngOwHaEo&pid=Api&P=0";
// import "../index.css";
import { MdMoreVert } from "react-icons/md";
import { MdAdd } from "react-icons/md";

function Chat() {
  return (
    <>
    <div id="contacts" className="col-span-12 smm:col-span-5 mdd:col-span-4 lgg:col-span-3">
      <section
        id="settings"
        class="h-[3rem] w-full rounded-md px-4 bg-gradient-to-l from-indigo-500 to-purple-500"
      >
        <div class="h-full w-full flex items-center justify-start relative">
          <div>
            <p class="text-[1.4rem] text-white font-bold">Chats</p>
          </div>
          <div class="absolute right-0 flex items-center justify-center">
            <MdMoreVert class="text-[1.6rem] text-white cursor-pointer" />
          </div>
        </div>
      </section>
      <section id="stories" class="h-[7.4rem] w-full bg-white rounded-md px-4">
        <div class="h-full w-full flex items-center justify-between space-x-2 py-5 overflow-x-auto overflow-y-clip no-scrollbar smm:scrollbar">
          {/* <!-- Story item 1 --> */}
          <div class="flex flex-col items-center justify-center space-y-2 cursor-pointer min-w-[23%]">
            {/* <!-- Story Image --> */}
            <div class="h-14 w-14 flex items-center justify-center rounded-full border border-solid border-gray-500 hover:bg-gray-100 cursor-pointer">
              {/* <AddOutline color={"#525252"} height="30px" width="30px" /> */}
              <MdAdd class="text-[1.7rem] text-gray-600 cursor-pointer"/>
            </div>
            {/* <!-- Story text --> */}
            <p class="text-xs font-bold text-gray-600">My Story</p>
          </div>

          {/* <!-- Story item 2 --> */}
          <div class="flex flex-col items-center justify-center space-y-2 cursor-pointer min-w-[23%]">
            {/* <!-- Story Image --> */}
            <div class="h-14 w-14">
              <img src={Anisha} alt="Anisha" />
            </div>
            {/* <!-- Story text --> */}
            <p class="text-xs font-bold text-gray-600">Anisha M.</p>
          </div>

          {/* <!-- Story item 3 --> */}
          <div class="flex flex-col items-center justify-center space-y-2 cursor-pointer min-w-[23%]">
            {/* <!-- Story Image --> */}
            <div class="h-14 w-14">
              <img src={Shanai} alt="Shanai" />
            </div>
            {/* <!-- Story text --> */}
            <p class="text-xs font-bold text-gray-600">Richard K.</p>
          </div>

          {/* <!-- Story item 4 --> */}
          <div class="flex flex-col items-center justify-center space-y-2 cursor-pointer min-w-[23%]">
            {/* <!-- Story Image --> */}
            <div class="h-14 w-14">
              <img src={Ali} alt="Ali" />
            </div>
            {/* <!-- Story text --> */}
            <p class="text-xs font-bold text-gray-600">Ali R.</p>
          </div>
          {/* <!-- Story item 5 --> */}
          <div class="flex flex-col items-center justify-center space-y-2 cursor-pointer min-w-[23%]">
            {/* <!-- Story Image --> */}
            <div class="h-14 w-14">
              <img src={Ali} alt="Ali" />
            </div>
            {/* <!-- Story text --> */}
            <p class="text-xs font-bold text-gray-600">Ali R.</p>
          </div>
          {/* <!-- Story item 6 --> */}
          <div class="flex flex-col items-center justify-center space-y-2 cursor-pointer min-w-[23%]">
            {/* <!-- Story Image --> */}
            <div class="h-14 w-14">
              <img src={Anisha} alt="anisha" />
            </div>
            {/* <!-- Story text --> */}
            <p class="text-xs font-bold text-gray-600">Ali R.</p>
          </div>
          {/* <!-- Story item 7 --> */}
          <div class="flex flex-col items-center justify-center space-y-2 cursor-pointer min-w-[23%]">
            {/* <!-- Story Image --> */}
            <div class="h-14 w-14">
              <img src={Shanai} alt="shanai" />
            </div>
            {/* <!-- Story text --> */}
            <p class="text-xs font-bold text-gray-600">Ali R.</p>
          </div>
          {/* <!-- Story item 8 --> */}
          <div class="flex flex-col items-center justify-center space-y-2 cursor-pointer min-w-[23%]">
            {/* <!-- Story Image --> */}
            <div class="h-14 w-14">
              <img src={Anisha} alt="anisha" />
            </div>
            {/* <!-- Story text --> */}
            <p class="text-xs font-bold text-gray-600">Ali R.</p>
          </div>
        </div>
      </section>
      <section id="contacts" className="bg-white rounded-md mt-3">
        <div className="h-full flex flex-col items-between justify-start">
          {/* <!-- Contact Item 1 --> */}
          <div className="flex items-center justify-evenly space-x-2.5 px-3 py-6 bg-white hover:bg-gray-100 cursor-pointer">
            {/* <!-- Image --> */}
            <div className="w-[4.4rem]">
              <img src={Shanai} alt="Shanai" />
            </div>
            {/* <!-- Contact's text --> */}
            <div className="flex flex-col items-start justify-center space-y-0.5 w-[100%]">
              <p className="text-sm text-gray-600 font-bold">Arthur Mazila</p>
              <p className="text-xs text-gray-700">
                It's a long established fact that a
              </p>
            </div>
            {/* <!-- Time and notification --> */}
            <div className="flex flex-col items-end justify-center space-y-2">
              <p className="text-sm">6:23</p>
              <span className="text-center bg-gradient-to-l from-indigo-500 to-purple-500 text-white leading-[1.4rem] rounded-full w-[22px] h-[22px] text-xs font-medium">
                1
              </span>
            </div>
          </div>
          <hr className="h-0.5px bg-gray-400 w-10/12 mx-auto" />
          {/* <!-- Contact Item 2 --> */}
          <div className="flex items-center justify-evenly space-x-2.5 px-3 py-6 bg-white hover:bg-gray-100 cursor-pointer">
            {/* <!-- Image --> */}
            <div className="w-[4.4rem]">
              <img src={Anisha} alt="Anisha" />
            </div>
            {/* <!-- Contact's text --> */}
            <div className="flex flex-col items-start justify-center space-y-0.5 w-[100%]">
              <p className="text-sm text-gray-600 font-bold">Mark Killerz</p>
              <p className="text-xs text-gray-700">
                Many Desktop publishing pack
              </p>
            </div>
            {/* <!-- Time and notification --> */}
            <div className="flex flex-col items-end justify-center space-y-2">
              <p className="text-sm">7:48</p>
              <span className="text-center bg-gradient-to-l from-indigo-500 to-purple-500 text-white leading-[1.4rem] rounded-full w-[22px] h-[22px] text-xs font-medium">
                5
              </span>
            </div>
          </div>
          <hr className="h-0.5px bg-gray-400 w-10/12 mx-auto" />
          {/* <!-- Contact Item 3 --> */}
          <div className="flex items-center justify-evenly space-x-2.5 px-3 py-6 bg-white hover:bg-gray-100 cursor-pointer">
            {/* <!-- Image --> */}
            <div className="w-[4.4rem]">
              <img src={Ali} alt="Shanai" />
            </div>
            {/* <!-- Contact's text --> */}
            <div className="flex flex-col items-start justify-center space-y-0.5 w-[100%]">
              <p className="text-sm text-gray-600 font-bold">Marcin Duda</p>
              <p className="text-xs text-gray-700">
                Various various have evolve over
              </p>
            </div>
            {/* <!-- Time and notification --> */}
            <div className="flex flex-col items-end justify-center space-y-1">
              <p className="text-sm">9:01</p>
              &nbsp;
            </div>
          </div>
          <hr className="h-0.5px bg-gray-400 w-10/12 mx-auto" />
          {/* <!-- Contact Item 4 --> */}
          <div className="flex items-center justify-evenly space-x-2.5 px-3 py-6 bg-white hover:bg-gray-100 cursor-pointer">
            {/* <!-- Image --> */}
            <div className="w-[4.4rem]">
              <img src={Anisha} alt="Shanai" />
            </div>
            {/* <!-- Contact's text --> */}
            <div className="flex flex-col items-start justify-center space-y-0.5 w-[100%]">
              <p className="text-sm text-gray-600 font-bold">Wiz Clark</p>
              <p className="text-xs text-gray-700">
                It's a long established fact that a
              </p>
            </div>
            {/* <!-- Time and notification --> */}
            <div className="flex flex-col items-end justify-center space-y-1">
              <p className="text-sm">9:32</p>
              &nbsp;
            </div>
          </div>
          <hr className="h-0.5px bg-gray-400 w-10/12 mx-auto" />
          {/* <!-- Contact Item 5 --> */}
          <div className="flex items-center justify-evenly space-x-2.5 px-3 py-6 bg-white hover:bg-gray-100 cursor-pointer">
            {/* <!-- Image --> */}
            <div className="w-[4.4rem]">
              <img src={Shanai} alt="Shanai" />
            </div>
            {/* <!-- Contact's text --> */}
            <div className="flex flex-col items-start justify-center space-y-0.5 w-[100%]">
              <p className="text-sm text-gray-600 font-bold">Cream Digital</p>
              <p className="text-xs text-gray-700">
                It's a long established fact that a
              </p>
            </div>
            {/* <!-- Time and notification --> */}
            <div className="flex flex-col items-end justify-center space-y-1">
              <p className="text-sm">9:44</p>
              &nbsp;
            </div>
          </div>
          <hr className="h-0.5px bg-gray-400 w-10/12 mx-auto" />
          {/* <!-- Contact Item 6 --> */}
          <div className="flex items-center justify-evenly space-x-2.5 px-3 py-6 bg-white hover:bg-gray-100 cursor-pointer">
            {/* <!-- Image --> */}
            <div className="w-[4.4rem]">
              <img src={Ali} alt="Ali" />
            </div>
            {/* <!-- Contact's text --> */}
            <div className="flex flex-col items-start justify-center space-y-0.5 w-[100%]">
              <p className="text-sm text-gray-600 font-bold">Arthur Mazila</p>
              <p className="text-xs text-gray-700">
                It's a long established fact that a
              </p>
            </div>
            {/* <!-- Time and notification --> */}
            <div className="flex flex-col items-end justify-center space-y-1">
              <p className="text-sm">9:48</p>
              &nbsp;
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default Chat;
