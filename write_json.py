if __name__ == "__main__":
		df = pd.read_csv('./data/data.csv', encoding='utf8')
		with open('./data/us_shots.json', 'w+') as file:
			file.write(json.dumps(json.loads(df.to_json(orient='records')), indent=2))