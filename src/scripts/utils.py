import json
import pathlib

from bs4 import BeautifulSoup


def main(html):
    input_filename = html
    output_filename = input_filename.replace(".html", ".json")

    html_content = open(input_filename, encoding="utf-8").read()
    soup = BeautifulSoup(html_content, "html.parser")

    techniques_data = []
    current_technique = None

    for row in soup.select("table.table-techniques tbody tr"):
        if "class" in row.attrs:
            if "technique" in row["class"] and "sub" not in row["class"]:
                # New parent technique
                cols = row.find_all("td")
                tid = cols[0].get_text(strip=True)
                name = cols[1].get_text(strip=True)
                description = cols[2].get_text(strip=True)
                current_technique = {
                    "id": tid,
                    "name": name,
                    "description": description,
                    "outcome": "No Test Coverage",
                    "topCount": 0,
                    "bottomCount": 0,
                    "subtechniques": [],
                }
                techniques_data.append(current_technique)

            elif "sub" in row["class"]:
                # Subtechnique under current parent
                if current_technique is not None:
                    cols = row.find_all("td")
                    sid = cols[1].get_text(strip=True)
                    sname = cols[2].get_text(strip=True)
                    sdescription = cols[3].get_text(strip=True)
                    current_technique["subtechniques"].append(
                        {
                            "id": sid,
                            "name": sname,
                            "description": sdescription,
                            "outcome": "No Test Coverage",
                            "topCount": 0,
                            "bottomCount": 0,
                        }
                    )

    # Save to a JSON file
    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(techniques_data, f, indent=2, ensure_ascii=False)

    print(f"Saved to {output_filename}")


if __name__ == "__main__":
    path = "./mitre-html/mobile"
    path = pathlib.Path(path).resolve()
    for html_file in path.glob("*.html"):
        main(str(html_file))

    path = "./mitre-html/ics"
    path = pathlib.Path(path).resolve()
    for html_file in path.glob("*.html"):
        main(str(html_file))

    path = "./mitre-html/enterprise"
    path = pathlib.Path(path).resolve()
    for html_file in path.glob("*.html"):
        main(str(html_file))
