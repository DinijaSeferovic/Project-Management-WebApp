import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || "dinija";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "admindinija";
const MONGO_HOST =
	process.env.MONGO_URL ||
	`cluster0.a2p1hlj.mongodb.net/?retryWrites=true&w=majority`;

const MONGO = {
	host: MONGO_HOST,
	password: MONGO_PASSWORD,
	username: MONGO_USERNAME,
	options: MONGO_OPTIONS,
	uri: "mongodb://localhost:27017/bscprioritiz",
	//uri: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || "1h";
const ACCESS_TOKEN_SECRET =
	process.env.ACCESS_TOKEN_SECRET || "superencryptedsecret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "coolIssuer";

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT,
	token: {
		expireTime: SERVER_TOKEN_EXPIRETIME,
		accessSecret: ACCESS_TOKEN_SECRET,
		refreshSecret: REFRESH_TOKEN_SECRET,
	},
};

const config = {
	mongo: MONGO,
	server: SERVER,
};

export default config;
