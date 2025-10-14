"use client";
import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";


export default function AboutUs() {


    const restaurant = {
        name: "WOODVALE",
        tagline: "Where Forest Meets Table",
        description:
            "At Woodvale, we believe that the best meals are those that connect us to the earth. Our forest-inspired dining experience brings together locally-sourced ingredients, sustainable practices, and the warmth of woodland hospitality. Every dish tells a story of the land, the seasons, and the farmers who nurture our ingredients with care.",
        mission:
            "Our mission is to create a dining sanctuary where guests can escape the rush of modern life and reconnect with nature through thoughtfully prepared, seasonal cuisine. We partner with local farmers and foragers to bring you the freshest ingredients, prepared with techniques that honor both tradition and innovation.",
        story:
            "Founded in 2020, Woodvale emerged from a simple dream: to create a restaurant that feels like a retreat into the forest. Our founders, inspired by childhood memories of family gatherings in woodland cabins, designed every aspect of Woodvale to evoke the peace and beauty of nature. From our reclaimed wood tables to our living plant walls, every detail invites you to slow down, savor, and celebrate the bounty of the earth.",
    };


    return (
        <div className="h-[80vh] bg-[#2A332D]">
            {/* Story Section */}
            <section className="max-w-7xl flex gap-5 flex-col items-center text-center text-[var(--muted)] mx-auto px-4 py-16 md:py-24">
                <div className="flex flex-col gap-6">
                    <div className="flex  items-center justify-around">
                        <div className="bg-[var(--muted)] h-1 w-20"></div>
                        <h1 className="text-5xl tracking-widest">Our Story</h1>
                        <div className="bg-[var(--muted)] h-1 w-20"></div>
                    </div>
                    <h2 className="max-w-2xl text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.ea hic officiis architecto ducimus illo laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                </div>
                <div className="image max-w-7xl flex gap-6">
                    <div className="bg-[url('/images/image.jpg')] bg-center h-96 w-90"></div>
                    <div className="bg-[url('/images/forestBg.jpg')] h-96 w-40"></div>
                    <div className="bg-[url('/images/imag2.jpg')] bg-center h-96 w-90"></div>
                </div>
            </section>
        </div>
    );
}
