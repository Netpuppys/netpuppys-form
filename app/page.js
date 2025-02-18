"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  IoIosCalendar,
  IoMdArrowForward,
  IoMdArrowRoundBack,
  IoMdTimer,
  IoMdVideocam,
} from "react-icons/io";
import { FaEarthAsia } from "react-icons/fa6";
import logo from "../public/logo.png";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";
const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    budget: "",
    service: "",
    startTime: "",
    employeeSize: "",
    designation: "",
  });

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // Tomorrow's date

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(false);
  };

  const timeSlots = [
    "2:00pm",
    "2:30pm",
    "3:00pm",
    "3:30pm",
    "4:00pm",
    "4:30pm",
    "5:00pm",
    "5:30pm",
  ];

  const calculateEndTime = (time) => {
    const [hour, minute, period] = time.match(/(\d+):(\d+)([ap]m)/).slice(1);
    let hours = parseInt(hour, 10);
    let minutes = parseInt(minute, 10);

    minutes += 30;
    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }

    // Handle AM/PM transition
    if (hours === 12) {
      period === "am" ? (period = "pm") : (period = "am");
    } else if (hours > 12) {
      hours -= 12;
    }

    return `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFormVisible(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      selectedTime: selectedTime,
      selectedDate: selectedDate,
      createdAt: new Date(),
    };
    axios
      .post("https://forms.netpuppys.com/submit", updatedFormData)
      .then(() => {
        setLoader(false);
        toast.success("Your Appointment is confirmed with Gauri Singh");
        setFormData({
          name: "",
          email: "",
          phone: "",
          website: "",
          budget: "",
          service: "",
          startTime: "",
          employeeSize: "",
          designation: "",
          selectedTime: "",
          selectedDate: "",
        });
      })
      .catch((error) => {
        alert.error(error);
      });
  };

  return (
    <>
      <div className="min-h-screen py-8 md:py-[4%] w-full flex justify-center items-center">
        <div className="p-6  w-[98%] max-w-[1000px] flex flex-col md:flex-row gap-5 md:gap-0 justify-between mx-auto bg-white rounded-md border-[0.5px] border-gray-100 shadow-md">
          <div className="w-full md:w-[40%] h-full">
            <Image src={logo} alt="" className="w-[100px] h-fit" />
            <h5 className="text-gray-500 text-xl font-bold">Gauri Singh</h5>
            <h5 className="text-3xl font-semibold">30 Minute Meeting</h5>
            <h5 className="text-lg pt-5 text-gray-500 font-semibold flex gap-2 items-center">
              <span className="w-fit text-xl">
                <IoMdTimer />
              </span>
              30 min
            </h5>
            <h5 className="text-lg my-2 text-gray-500 font-semibold flex gap-2 items-center">
              <span className="w-fit text-xl">
                <IoMdVideocam />
              </span>
              <span>Web conferencing details provided upon confirmation.</span>
            </h5>
            {formVisible && (
              <>
                <h5 className="text-lg text-gray-500 font-semibold flex gap-2 items-center">
                  <span className="w-fit text-xl">
                    <IoIosCalendar />
                  </span>
                  {selectedTime} - {calculateEndTime(selectedTime)},{" "}
                  {selectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h5>
                <h5 className="text-lg mt-2 text-gray-500 font-semibold flex gap-2 items-center">
                  <span className="w-fit text-xl">
                    <FaEarthAsia />
                  </span>
                  India Standard Time
                </h5>
              </>
            )}

            <h5 className="text-base pt-5">
              Are you also wondering about getting your business online and
              grow, but stopped because that can be the uphill climb process?
              Well, here is your virtual companion. NETPUPPYS is here for small
              businesses to effortlessly set up a store and reach globally. You
              can manage your store from anywhere virtually.
              <br />
              Be prepared for the upcoming happy waves.
              <br />
              <br />
              Netpuppys,
              <br />
              Your Social Media Watchdog!
            </h5>
          </div>
          {!formVisible && (
            <div className="flex flex-col w-full md:w-[50%]">
              <div className="flex justify-between mb-2 gap-2">
                <h2 className="text-xl font-bold ">Select a Date & Time</h2>
                {selectedTime && (
                  <button
                    className="flex justify-end w-fit relative z-20 ml-auto p-2 text-2xl aspect-square rounded-full text-[#006EDC] bg-white hover:bg-[#006EDC] hover:text-white transition-all duration-300 shadow-2xl border border-gray-300"
                    onClick={() => setFormVisible(true)}
                  >
                    <IoMdArrowForward />
                  </button>
                )}
              </div>
              <Calendar
                onChange={handleDateSelect}
                value={selectedDate}
                minDate={minDate}
                tileDisabled={({ date, view }) =>
                  view === "month" &&
                  (date.getDay() === 0 || date.getDay() === 6)
                }
                className="text-xl w-fit mx-auto my-auto"
              />
              {selectedDate && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Select a Time Slot</h3>
                  <div className="flex w-full justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Time zone:- </h3>
                    <h3 className="text-lg w-fit font-semibold flex gap-2 justify-center items-center">
                      <FaEarthAsia />
                      India Standard Time
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleTimeSelect(slot)}
                        className={`w-[calc(25%-8px)] p-2 rounded-md hover:bg-[#006EDC] hover:text-white transition-all duration-300 ${
                          selectedTime === slot
                            ? "bg-[#006EDC] text-white"
                            : "border border-[#006EDC] text-[#006EDC]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {formVisible && (
            <div className="flex flex-col w-full md:w-[50%]">
              <button
                className="w-fit p-2 text-2xl aspect-square rounded-full text-[#006EDC] bg-white hover:bg-[#006EDC] hover:text-white transition-all duration-300 shadow-2xl border border-gray-300"
                onClick={() => setFormVisible(false)}
              >
                <IoMdArrowRoundBack />
              </button>
              <form onSubmit={handleSubmit} className="mt-4">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Name"
                  onChange={handleInputChange}
                  className="border focus:outline-none placeholder:text-[#aaaaaa] p-2 w-full mb-2"
                  required
                />
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                  className="border focus:outline-none placeholder:text-[#aaaaaa] p-2 w-full mb-2"
                  required
                />
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  placeholder="Phone Number"
                  onChange={handleInputChange}
                  className="border focus:outline-none placeholder:text-[#aaaaaa] p-2 w-full mb-2"
                  required
                />
                <label>Company Website URL *</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  placeholder="Company Website URL"
                  onChange={handleInputChange}
                  className="border focus:outline-none placeholder:text-[#aaaaaa] p-2 w-full mb-2"
                  required
                />
                <label>Estimated Budget *</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={`border focus:outline-none p-2 w-full mb-2 ${
                    formData.budget === "" ? "text-[#aaaaaa]" : ""
                  }`}
                  required
                >
                  <option
                    defaultValue
                    disabled
                    className="text-[#aaaaaa]"
                    value=""
                  >
                    Select
                  </option>
                  <option className="text-black" value="50000-100000">
                    50,000-100,000
                  </option>
                  <option className="text-black" value="100000-300000">
                    100,000-300,000
                  </option>
                  <option className="text-black" value="above 300000">
                    Above 300,000
                  </option>
                </select>
                <label>Which product/service you want to promote? *</label>
                <textarea
                  name="service"
                  value={formData.service}
                  placeholder="Which product/service you want to promote?"
                  onChange={handleInputChange}
                  className="border focus:outline-none placeholder:text-[#aaaaaa] p-2 w-full mb-2"
                  required
                ></textarea>
                <label>When are you planning to start? *</label>
                <select
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className={`border focus:outline-none placeholder:text-[#aaaaaa] p-2 w-full mb-2 ${
                    formData.startTime === "" ? "text-[#aaaaaa]" : ""
                  }`}
                  required
                >
                  <option
                    defaultValue
                    disabled
                    className="text-[#aaaaaa]"
                    value=""
                  >
                    Select
                  </option>
                  <option className="text-black" value="Immediately">
                    Immediately
                  </option>
                  <option className="text-black" value="Within 15 days">
                    Within 15 days
                  </option>
                  <option className="text-black" value="Next Month">
                    Next Month
                  </option>
                </select>
                <label>Company Employee Size *</label>
                <select
                  name="employeeSize"
                  value={formData.employeeSize}
                  onChange={handleInputChange}
                  className={`border focus:outline-none placeholder:text-[#aaaaaa] p-2 w-full mb-2 ${
                    formData.employeeSize === "" ? "text-[#aaaaaa]" : ""
                  }`}
                  required
                >
                  <option
                    defaultValue
                    disabled
                    className="text-[#aaaaaa]"
                    value=""
                  >
                    Select
                  </option>
                  <option className="text-black" value="0-10">
                    0-10
                  </option>
                  <option className="text-black" value="10-25">
                    10-25
                  </option>
                  <option className="text-black" value="25-50">
                    25-50
                  </option>
                  <option className="text-black" value="50-100">
                    50-100
                  </option>
                  <option className="text-black" value="above 100">
                    Above 100
                  </option>
                </select>
                <label>Your Designation *</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  placeholder="Your Designation"
                  onChange={handleInputChange}
                  className="border focus:outline-none placeholder:text-[#aaaaaa] p-2 w-full"
                  required
                />
                <button
                  type="submit"
                  className="p-2 border border-[#006EDC] bg-[#006EDC] text-white hover:bg-white hover:text-[#006EDC] w-full mt-4 rounded-md transition-all duration-300"
                >
                  Schedule Your Appointment
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <ToastContainer closeButton closeOnClick={true} />
      {loader && (
        <div className="w-full h-screen absolute top-0 z-30 bg-white backdrop-blur-md bg-opacity-20">
          <ThreeDots color="#b90124" />
        </div>
      )}
    </>
  );
};

export default AppointmentBooking;
