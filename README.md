This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Notes

```bash
curl -s -X GET http://192.168.5.111:8888/api/v2/agents -H "Content-Type: application/json" -H "Key: BLUEADMIN123"
```

Group : [group]
Name : [display_name]
Platform : [platform]
Contact : [contact]
IP : [host_ip_addrs]
Privileges : [privilege]
Last : [last_seen]
Status : [deadman_enabled]

---

```bash
curl -X POST http://192.168.5.111:8888/attacks \
 -H "Content-Type: application/json" -H "Key: BLUEADMIN123" \
 -d '{
"page": 1,
"items_per_page": 10,
"name": "",
"platform": "",
"mitre": "",
"tactic": "",
"threat_group": ""
}'
```

- Name : [data][technique_name]
- Platform : [data][executors][X][platform]
- Plug in : [data][executors][X][name]
- ATT&CK Tactics : [data][technique]
- Technique : [data][technique_id]
- Last Update : [data][last_modified]

```bash
a = curl -s -X GET http://192.168.5.111:8888/api/v2/adversaries -H "Content-Type: application/json" -H "Key: BLUEADMIN123"
b = curl -s -X GET http://192.168.5.111:8888/api/v2/abilities/[x][atomic_ordering] -H "Content-Type: application/json" -H "Key: BLUEADMIN123"
```

- Choose : a.[x][name]
  #############################
- Name : a.[x][atomic_ordering]
- Defend Type : b.[tactic]
- TTP : b.[technique_name]
- Plug-in : b.[executors][y][platform]
- Pre-Con :
- Unlock :

```bash
curl -s -X GET http://192.168.5.111:8888/api/v2/operations -H "Content-Type: application/json" -H "Key: BLUEADMIN123"
```

- Assessment Name : [x][name]
- Defend Scenario : [x][adversary][name]
- Assets : count( [x][host_group] )
- Live Status : [x][state]
- Last Activity : [x][start]
