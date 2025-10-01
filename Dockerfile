# ベースイメージ: Node.js（Expo は Node 上で動く）
FROM node:22

# 作業ディレクトリを作成
WORKDIR /app

# package.json と lockファイルを先にコピーして依存関係をインストール
COPY package*.json ./

# 依存関係をインストール
RUN npm install -g expo-cli
RUN npm install

# プロジェクト全体をコピー
COPY . .

# Expo が動くポートを公開
EXPOSE 8081

# Expo 開発サーバを起動
CMD ["npm", "run", "start:web"]
