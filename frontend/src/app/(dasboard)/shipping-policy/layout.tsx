import type { Metadata } from "next";
import Head from "next/head";


export const metadata: Metadata = {
  title: "Shipping Policy | SAADiCcollection.shop",
  description:
    "Read the SAADiCcollection.shop shipping policy to learn about delivery times, shipping methods, and order tracking details.",
keywords: [
  "shipping policy saadicollection.shop",
  "shipping policy saadicollection",
  "delivery information saadicollection.shop",
  "delivery information saadicollection",
  "order tracking saadicollection.shop",
  "order tracking saadicollection",
  "shipping rates saadicollection.shop",
  "shipping rates saadicollection",
  "saadicollection.shop shipping",
  "saadicollection shipping",
  "saadicollection.shop delivery",
  "saadicollection delivery",
  "saadicollection.shop order status",
  "saadicollection order status",
  "saadicollection.shop shipping details",
  "saadicollection shipping details",
  "saadicollection.shop delivery options",
  "saadicollection delivery options",
  "saadicollection.shop package tracking",
  "saadicollection package tracking",
  "saadicollection.shop estimated delivery",
  "saadicollection estimated delivery",
  "saadicollection.shop shipping info",
  "saadicollection shipping info",
  "saadicollection.shop",
  "saadicollection"
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
        <link rel="canonical" href="https://www.saadicollection.shop/shipping-policy" />
      </Head>
   <main className="">{children}</main>
   </>
  );
}
