import type { Metadata } from "next";
import Head from "next/head";



export const metadata: Metadata = {
  title: "Sign Up | SAADiCcollection.shop",
  description: "Create your account to start selling or shopping on SAADiCcollection.shop. Join now to manage products, track orders, and explore deals.",
  keywords: [
  "saadicollection sign up",
  "saadicollection register",
  "saadicollection create account",
  "saadicollection seller registration",
  "saadicollection buyer registration",
  "saadicollection shop register",
  "saadicollection account setup",
  "register saadicollection shop",
  "create saadicollection account",
  "online store registration saadicollection",
  "ecommerce account registration",
  "new user saadicollection",
  "seller panel registration saadicollection",
  "customer account register saadicollection",
  "SAADiCcollection.shop"
]

};




export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
          <>
      <Head>
        <link rel="canonical" href="https://www.saadicollection.shop/sign-up" />
      </Head>
   <main className="">{children}</main>
   </>
  );
}
