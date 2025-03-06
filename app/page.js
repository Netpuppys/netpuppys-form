"use client";
import React, { useState } from "react";
import logo from "../public/logo.png";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";
const AppointmentBooking = () => {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    budget: "",
    service: "",
    startTime: "",
    designation: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const updatedFormData = {
      ...formData,
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
          designation: "",
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
          <div className="flex flex-col w-full md:w-[50%]">
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
              <label>Company Website URL (Optional)</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                placeholder="Company Website URL"
                onChange={handleInputChange}
                className="border focus:outline-none placeholder:text-[#aaaaaa] p-2 w-full mb-2"
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
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={`border focus:outline-none placeholder:text-[#aaaaaa] p-2 w-full mb-2 ${
                  formData.service === "" ? "text-[#aaaaaa]" : ""
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
                <option
                  className="text-black"
                  value="Advertising and Marketing"
                >
                  Advertising and Marketing
                </option>
                <option
                  className="text-black"
                  value="Content Creation and Curation"
                >
                  Content Creation and Curation
                </option>
                <option className="text-black" value="Influencer Marketing">
                  Influencer Marketing
                </option>
                <option className="text-black" value="Social Media Marketing">
                  Social Media Marketing
                </option>
                <option
                  className="text-black"
                  value="Search Engine Optimization"
                >
                  Search Engine Optimization
                </option>
                <option className="text-black" value="Web Development">
                  Web Development
                </option>
              </select>
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

              <label>Your Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                placeholder="Your Designation (Optional)"
                onChange={handleInputChange}
                className="border focus:outline-none placeholder:text-[#aaaaaa] p-2 w-full"
              />
              <button
                type="submit"
                className="p-2 border border-[#006EDC] bg-[#006EDC] text-white hover:bg-white hover:text-[#006EDC] w-full mt-4 rounded-md transition-all duration-300"
              >
                Schedule Your Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer closeButton closeOnClick={true} />
      {loader && (
        <div className="w-full flex justify-center items-center h-screen absolute top-0 z-30 bg-white backdrop-blur-md bg-opacity-20">
          <ThreeDots color="#b90124" />
        </div>
      )}
    </>
  );
};

export default AppointmentBooking;
