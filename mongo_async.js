// @ts-check
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://tetz:qwer1234@cluster0.sdiakr0.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();
  const member = client.db('kdt4').collection('member');

  const deleteManyResult = await member.deleteMany({});
  if (!deleteManyResult.acknowledged) throw new Error('삭제 실패');

  const insertResult = await member.insertMany([
    {
      id: 'tetz',
      name: '이효석',
      isMarried: false,
      age: 38,
    },
    {
      id: 'eric',
      name: '김성재',
      isMarried: true,
      age: 38,
    },
    {
      id: 'ailee',
      name: '이재연',
      isMarried: false,
      age: 35,
    },
    {
      id: 'alex',
      name: '하승호',
      isMarried: false,
      age: 34,
    },
    {
      id: 'uncle',
      name: '박동희',
      isMarried: true,
      age: 38,
    },
  ]);
  if (!insertResult.acknowledged) throw new Error('도큐먼트 삽입 실패');

  const insertMemberResult = await member.insertOne({
    id: 'ted',
    name: '방성민',
    isMarried: false,
    age: 37,
  });
  if (!insertMemberResult.acknowledged) throw new Error('도큐먼트 삽입 실패');

  const updateOneResult = await member.updateOne(
    { id: 'ted' },
    { $set: { isMarried: true } },
  );
  if (!updateOneResult.acknowledged) throw new Error('도큐먼트 수정 실패');

  //   // 데이터 하나만 출력하는 코드
  //   const data = await member.findOne({ id: 'ted' });
  //   console.log(data);

  //   // 전체 데이터 출력 코드
  //   const findCursor = member.find({
  //     $and: [{ age: { $gte: 38 } }, { isMarried: true }],
  //   });
  //   const data = await findCursor.toArray();
  //   console.log(data);

  //   // 36세 이하 이거나, 결혼을 한 사람
  //   const findCursor = member.find({
  //     $or: [{ age: { $lte: 36 } }, { isMarried: true }],
  //   });
  //   const data = await findCursor.toArray();
  //   console.log(data);

  // updateTime 적용
  const updateManyResult = await member.updateMany(
    {},
    { $set: { updateTime: new Date(Date.now()) } },
  );
  if (!updateManyResult.acknowledged) throw new Error('전체 데이터 수정 실패');

  const findCursor = member.find({});
  const data = await findCursor.toArray();
  console.log(data);

  client.close();
}

main();
