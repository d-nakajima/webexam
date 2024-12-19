import { getLocale, setRequestLocale } from "next-intl/server";
import React from "react";

type Props = {
  params: { locale: string };
};
// 利用規約コンポーネント
export default async function TermsOfUse(props: Props) {
  setRequestLocale(props.params.locale);
  const styles = {
    title: "text-2xl font-bold mb-4",
    updateDate: "text-sm text-gray-600 mb-6",
    sectionTitle: "text-xl font-semibold mb-2",
    sectionContent: "text-gray-700",
    list: "list-disc list-inside text-gray-700 space-y-2",
  };
  const locale = await getLocale();

  if (locale === "ja") {
    return (
      <div className="p-6 bg-gray-100 text-gray-800 max-w-3xl m-auto h-screen overflow-scroll">
        <h1 className={styles.title}>利用規約</h1>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>1. 利用の範囲</h2>
          <p className={styles.sectionContent}>
            本アプリは、個人的かつ非商業的な目的でのみ利用することができます。
          </p>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>2. 禁止事項</h2>
          <ul className={styles.list}>
            <li>本アプリを違法行為や不正な目的で利用することはできません。</li>
            <li>
              他のユーザーや本アプリのシステムに損害を与える行為を禁止します。
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>3. 免責事項</h2>
          <p className={styles.sectionContent}>
            本アプリの使用はユーザー自身の責任で行われるものとします。本アプリの利用に関連して発生したいかなる損害についても、当社は一切責任を負いません。
          </p>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>4. 規約の変更</h2>
          <p className={styles.sectionContent}>
            本規約は随時変更される場合があります。
          </p>
        </section>
        <p className={styles.updateDate}>最終更新日：2024年11月8日</p>
      </div>
    );
  } else if (locale === "en") {
    return (
      <div className="p-6 bg-gray-100 text-gray-800 max-w-3xl m-auto h-screen overflow-scroll">
        <h1 className={styles.title}>Terms of Use</h1>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>1. Scope of Use</h2>
          <p className={styles.sectionContent}>
            This app may only be used for personal and non-commercial purposes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>2. Prohibited Acts</h2>
          <ul className={styles.list}>
            <li>
              Users may not use this app for illegal activities or malicious
              purposes.
            </li>
            <li>
              Users are prohibited from engaging in acts that cause damage to
              other users or the app&apos;s systems.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>3. Disclaimer</h2>
          <p className={styles.sectionContent}>
            Users are responsible for their own use of this app. We are not
            responsible for any damages resulting from the use of this app.
          </p>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>4. Changes to the Terms</h2>
          <p className={styles.sectionContent}>
            These terms may be changed at any time.
          </p>
        </section>
        <p className={styles.updateDate}>Last updated: November 8, 2024</p>
      </div>
    );
  }
}
