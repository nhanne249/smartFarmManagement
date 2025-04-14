import json
import sys
import pandas as pd
# from sklearn.linear_model import LinearRegression
# from sklearn.model_selection import train_test_split

data = sys.argv[1]
print(type(json.load(data)))
# data = [
#     {"humidity": 60, "temperature": 22},
#     {"humidity": 65, "temperature": 24},
#     {"humidity": 70, "temperature": 26},
# ]

# df = pd.DataFrame(data)

# X = df[['humidity']]
# y = df['temperature']

# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# model = LinearRegression()
# model.fit(X_train, y_train)

# slope = model.coef_[0]
# intercept = model.intercept_

# result = {
#     "slope": slope,
#     "intercept": intercept
# }

# print(json.dumps(result))