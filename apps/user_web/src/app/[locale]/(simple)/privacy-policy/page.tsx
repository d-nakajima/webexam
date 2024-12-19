import { getLocale, setRequestLocale } from "next-intl/server";
import React from "react";

type Props = {
  params: { locale: string };
};

// プライバシーポリシーコンポーネント
export default async function PrivacyPolicy(props: Props) {
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
        <h1 className={styles.title}>プライバシーポリシー</h1>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>1. 収集する情報</h2>
          <ul className={styles.list}>
            <li>
              <strong>ユーザー提供情報：</strong>{" "}
              本アプリの使用に関連して、ユーザーが入力した情報は、個人データとしてサーバーに保存されます。なお、入力ユーザーのみが該当情報にアクセスできるよう、セキュリティを設定しております。
            </li>
            <li>
              <strong>匿名データ：</strong>{" "}
              ユーザー体験の向上のため、使用状況の統計データを匿名で収集する場合があります。
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>2. 情報の使用目的</h2>
          <p className={styles.sectionContent}>
            本アプリの機能改善および品質向上のため、匿名データを活用します。法令の要求がある場合を除き、個人を特定できる情報を第三者に開示することはありません。
          </p>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>3. 情報の保護</h2>
          <p className={styles.sectionContent}>
            本アプリは業界標準のセキュリティ手法を使用して、ユーザーの情報を保護しています。
          </p>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>4. プライバシーポリシーの変更</h2>
          <p className={styles.sectionContent}>
            本ポリシーは随時更新されることがあります。
          </p>
        </section>
        <p className={styles.updateDate}>最終更新日：2024年11月8日</p>
      </div>
    );
  } else if (locale === "en") {
    return (
      <div className="p-6 bg-gray-100 text-gray-800 max-w-3xl m-auto h-screen overflow-scroll">
        <h1 className={styles.title}>Privacy Policy</h1>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>1. Information Collection</h2>
          <ul className={styles.list}>
            <li>
              <strong>User-provided Information:</strong> Information entered by
              users (memos, settings, etc.) is stored on the server as personal
              data related to the use of this application. Security is set so
              that only the input user can access the relevant information.
            </li>
            <li>
              <strong>Anonymous Data:</strong> Anonymous usage statistics may be
              collected for the improvement of user experience.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>2. Purpose of Information Use</h2>
          <p className={styles.sectionContent}>
            Anonymous data is used to improve the functionality and quality of
            this application. Except as required by law, no information that can
            identify an individual will be disclosed to third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>3. Information Protection</h2>
          <p className={styles.sectionContent}>
            This application uses industry-standard security methods to protect
            user information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className={styles.sectionTitle}>
            4. Changes to the Privacy Policy
          </h2>
          <p className={styles.sectionContent}>
            This policy may be updated at any time.
          </p>
        </section>
        <p className={styles.updateDate}>Last Updated: November 8, 2024</p>
      </div>
    );
  }
}
