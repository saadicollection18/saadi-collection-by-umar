import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Login | SAADiCcollection.shop",
  description: "Access your seller or buyer account. Secure login to manage your store, track orders, and shop on SAADiCcollection.shop.",
keywords: [
  "saadicollection login",
  "saadicollection shop login",
  "saadicollection account",
  "saadicollection seller login",
  "saadicollection buyer login",
  "login saadicollection shop",
  "saadicollection dashboard",
  "online store login saadicollection",
  "ecommerce login saadicollection",
  "customer account login",
  "seller panel saadicollection",
  "order tracking login saadicollection",
  "secure login saadicollection"
]

};

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.saadicollection.shop/login" />
      </Head>
      <main>{children}</main>
    </>
  );
}
