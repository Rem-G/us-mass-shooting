import pandas as pd
import json

class Tools:
	def __init__(self):
		self.df = pd.read_csv('./data/data.csv', encoding='utf8')

	def jsonify(self, df):
		return json.dumps(json.loads(df.to_json(orient='records')), indent=2)

	def main(self):
		return self.jsonify(self.df)